export interface INotification {
    for: "responders" | "admin";
    name: "new mission";
    payload: Record<string, any>;
}
