use axum::{routing::get, Json, Router};
use libsql_client::client::Client;
use shuttle_secrets::SecretStore;
use tower_http::cors::CorsLayer;

#[derive(serde::Serialize)]
struct LuckResponse {
    luck: bool,
}

async fn luck() -> impl axum::response::IntoResponse {
    Json(LuckResponse { luck: true })
}

#[shuttle_runtime::main]

async fn main(
    #[shuttle_turso::Turso(
        addr = "libsql://lab-next-bff-marcusradell.turso.io",
        token = "{secrets.DB_TURSO_TOKEN}"
    )]
    client: Client,
    // use secrets if you are not hardcoding your token/addr
    #[shuttle_secrets::Secrets] secrets: SecretStore,
) -> shuttle_axum::ShuttleAxum {
    let router = Router::new()
        .route("/api/luck", get(luck))
        .layer(CorsLayer::permissive());

    Ok(router.into())
}
