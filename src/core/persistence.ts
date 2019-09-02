import Logger from "js-logger";
import { ServerModel } from "./model";

const logger = Logger.get("core/persistence/Persister");

export abstract class Persister {
    protected persist_for_server(server: ServerModel, key: string, data: any): void {
        this.persist(this.server_key(server, key), data);
    }

    protected persist(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            logger.error(`Couldn't persist ${key}.`, e);
        }
    }

    protected async load_for_server<T>(server: ServerModel, key: string): Promise<T | undefined> {
        return this.load(this.server_key(server, key));
    }

    protected async load<T>(key: string): Promise<T | undefined> {
        try {
            const json = localStorage.getItem(key);
            return json && JSON.parse(json);
        } catch (e) {
            logger.error(`Couldn't load ${key}.`, e);
            return undefined;
        }
    }

    private server_key(server: ServerModel, key: string): string {
        let k = key + ".";

        switch (server) {
            case ServerModel.Ephinea:
                k += "Ephinea";
                break;
            default:
                throw new Error(`Server ${ServerModel[server]} not supported.`);
        }

        return k;
    }
}
