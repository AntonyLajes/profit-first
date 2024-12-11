import { Database } from "@nozbe/watermelondb"
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import schema from "../schema/schema"
import migrations from "../migration/migrations"
import Account from "../model/account"
import Allocations from "../model/allocations"

const adapter = new SQLiteAdapter({
    schema,
    migrations
})

export const database = new Database({
    adapter,
    modelClasses: [Account, Allocations]
})