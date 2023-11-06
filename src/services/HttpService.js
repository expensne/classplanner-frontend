import { log } from "./loggerService";

const LOG_PREFIX = "HttpService";

const API_URL =
    process.env.NODE_ENV !== "development"
        ? "https://api.cp.dev101.de/v1"
        : "http://localhost:5000/v1";

export async function fetchData(path = "/", options = {}) {
    if (process.env.NODE_ENV !== "development") {
        options = {
            ...options,
            credentials: "include"
        };
    }

    try {
        const response = await fetch(API_URL + path, options);
        // Return json if there is a body, otherwise return null
        if (response.status === 204) return null;
        if (!response.ok) {
            log("error", LOG_PREFIX, "Response not ok, see:");
            log("error", LOG_PREFIX, response);
            throw new Error(response.statusText + " (" + response.status + ")");
        }
        return await response.json();
    } catch (error) {
        log("error", LOG_PREFIX, "Error fetching data from server for URL: " + path);
        log("error", LOG_PREFIX, error);
    }
}

export function deleteItem(path) {
    log("info", LOG_PREFIX, "deleteItem", path);

    return fetchData(path, {
        method: "DELETE"
    });
}

export function addItem(path, data) {
    log("info", LOG_PREFIX, "addItem", path, data);

    return fetchData(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

export function updateItem(path, data) {
    log("info", LOG_PREFIX, "updateItem", path, data);

    return fetchData(path, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}
