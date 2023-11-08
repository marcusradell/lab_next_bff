use std::{error::Error, sync::Arc};

use axum::{routing::get, Json, Router};
use libsql_client::Client;
use serde::{Deserialize, Serialize};

#[derive(Clone)]
pub struct CoursePlanKit {
    _db: Arc<Client>,
}

#[derive(Serialize, Deserialize)]
pub struct CoursePlan {
    id: i32,
    name: String,
}

impl CoursePlanKit {
    pub fn new(db: Arc<Client>) -> Self {
        Self { _db: db }
    }

    pub async fn get_all(&self) -> Result<Vec<CoursePlan>, Box<dyn Error>> {
        Ok(vec![CoursePlan {
            id: 1,
            name: "Course Plan 1".to_string(),
        }])
    }

    pub fn router(&self) -> Router {
        Router::new().route(
            "/get_all",
            get({
                let this = self.clone();

                || async move { Json(this.get_all().await.unwrap()) }
            }),
        )
    }
}
