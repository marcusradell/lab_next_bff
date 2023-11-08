use std::sync::Arc;

use axum::{extract::State, routing::get, Json, Router};
use libsql_client::{client::Client, Value};
use tower_http::cors::CorsLayer;

#[derive(serde::Serialize)]
struct LuckResponse {
    luck: bool,
}

async fn luck_handler(state: State<AppState>) -> impl axum::response::IntoResponse {
    let db_result = state.db.execute("select * from luck").await.unwrap();

    let row = db_result.rows.get(0).unwrap();

    let value = row.values.get(1).unwrap();

    let luck = match value {
        Value::Integer { value } => {
            if *value == 1 {
                true
            } else {
                false
            }
        }
        _ => false,
    };
    Json(LuckResponse { luck })
}

#[derive(Clone)]
struct AppState {
    db: Arc<Client>,
}

#[shuttle_runtime::main]

async fn main(
    #[shuttle_turso::Turso(
        addr = "libsql://lab-next-bff-marcusradell.turso.io",
        token = "{secrets.DB_TURSO_TOKEN}"
    )]
    client: Client,
) -> shuttle_axum::ShuttleAxum {
    // client
    //     .execute("create table luck (uid text primary key, luck integer not null)")
    //     .await?;

    // client
    //     .execute("insert into luck (uid, luck) values ('marcus', 1)")
    //     .await?;
    let app_state = AppState {
        db: Arc::new(client),
    };

    let router = Router::new()
        .route("/api/luck", get(luck_handler))
        .layer(CorsLayer::permissive())
        .with_state(app_state);

    Ok(router.into())
}
