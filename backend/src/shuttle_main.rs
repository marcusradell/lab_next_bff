use axum::{routing::get, Router};
use kits::course_plans::CoursePlanKit;
use libsql_client::client::Client;
use std::sync::Arc;
use tower_http::cors::CorsLayer;

mod kits;

#[derive(Clone)]
struct AppState {
    db: Arc<Client>,
}

#[shuttle_runtime::main]

async fn main(
    #[shuttle_turso::Turso(addr = "{secrets.DB_TURSO_ADDR}", token = "{secrets.DB_TURSO_TOKEN}")]
    client: Client,
) -> shuttle_axum::ShuttleAxum {
    let app_state = AppState {
        db: Arc::new(client),
    };

    let course_plan_kit = CoursePlanKit::new(app_state.db.clone());
    let course_plan_router = course_plan_kit.router();

    let api_router = Router::new().nest("/course_plans", course_plan_router);

    let router = Router::new()
        .route("/", get(|| async { "Up and running!" }))
        .nest("/api", api_router)
        .layer(CorsLayer::permissive());

    Ok(router.into())
}
