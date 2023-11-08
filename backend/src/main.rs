use axum::{routing::get, Json, Router};
use tower_http::cors::CorsLayer;

#[derive(serde::Serialize)]
struct LuckResponse {
    luck: bool,
}

async fn luck() -> impl axum::response::IntoResponse {
    Json(LuckResponse { luck: true })
}

#[shuttle_runtime::main]
async fn main() -> shuttle_axum::ShuttleAxum {
    let router = Router::new()
        .route("/api/luck", get(luck))
        .layer(CorsLayer::permissive());

    Ok(router.into())
}
