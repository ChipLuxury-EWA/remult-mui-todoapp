// Import necessary types from Redux Toolkit Query and remult
import type {
    BaseQueryFn,
    EndpointBuilder,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    MutationDefinition,
    QueryDefinition,
} from "@reduxjs/toolkit/query";
import type { ErrorInfo, FindOptions, Repository } from "remult";

// Utility type to pluralize a given string
type Pluralize<T extends string> = T extends `${infer S}s`
    ? `${S}ses` // Pluralization for cases like "class" -> "classes"
    : T extends `${infer S}y`
    ? `${S}ies` // Pluralization for cases like "category" -> "categories"
    : T extends `${infer S}`
    ? `${S}s` // Default pluralization
    : never;

// Type definition for queries related to CRUD operations
export type NameActions<EntityType, TagName extends string, ReducerPath extends string> = {
    // Query type for getting entities
    [K in `get${Capitalize<Pluralize<TagName>>}`]: QueryDefinition<
        FindOptions<EntityType>,
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, NonNullable<unknown>, FetchBaseQueryMeta>,
        TagName,
        EntityType[] | undefined,
        ReducerPath
    >;
} & {
    // Query type for adding an entity
    [K in `add${Capitalize<TagName>}`]: MutationDefinition<
        Partial<EntityType>,
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, FetchBaseQueryMeta>,
        TagName,
        EntityType,
        ReducerPath
    >;
} & {
    // Query type for updating an entity
    [K in `update${Capitalize<TagName>}`]: MutationDefinition<
        Partial<EntityType>,
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, FetchBaseQueryMeta>,
        TagName,
        EntityType,
        ReducerPath
    >;
} & {
    // Query type for deleting an entity
    [K in `delete${Capitalize<TagName>}`]: MutationDefinition<
        string | number | Partial<EntityType>,
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, unknown, FetchBaseQueryMeta>,
        TagName,
        void,
        ReducerPath
    >;
};

// Function for building endpoints and queries for CRUD operations
export function buildEndPoints<EntityType, TagName extends string, ReducerPath extends string>(
    repo: Repository<EntityType>, // Repository containing entities
    tagName: TagName, // Tag name for queries
    build: EndpointBuilder<
        // Endpoint builder for creating queries
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>,
        TagName,
        ReducerPath
    >
): NameActions<EntityType, TagName, ReducerPath> {
    return {
        // Query for getting entities
        ["get" + tagName + "s"]: build.query({
            queryFn: async (options: FindOptions<EntityType>) => {
                return toQueryFn(() => repo.find({ ...options })); // Execute query function
            },
            providesTags: [tagName], // Tags provided by this action
        }),
        // Query for adding an entity
        ["add" + tagName]: build.mutation({
            queryFn: async (item: Partial<EntityType>) => {
                return toQueryFn(() => repo.insert(item)); // Execute mutation function
            },
            invalidatesTags: [tagName], // Tags invalidated by this action
        }),
        // Query for updating an entity
        ["update" + tagName]: build.mutation({
            queryFn: async (item: Partial<EntityType>) => {
                return toQueryFn(() => repo.save(item)); // Execute mutation function
            },
            invalidatesTags: [tagName], // Tags invalidated by this action
        }),
        // Query for deleting an entity
        ["delete" + tagName]: build.mutation({
            queryFn: async (id: string | number | Partial<EntityType>) => {
                // @ts-expect-error id will work
                return toQueryFn(() => repo.delete(id)); // Execute mutation function
            },
            invalidatesTags: [tagName], // Tags invalidated by this action
        }),
    } as NameActions<EntityType, TagName, ReducerPath>;
}

// Utility function to convert a promise-based function to a query function
export async function toQueryFn<T>(operation: () => Promise<T>, repo?: Repository<T>) {
    try {
        let data = await operation(); // Execute the provided function
        if (repo) data = repo.toJson(data); // Convert data using repository's toJson method if provided

        return { data }; // Return data
    } catch (error) {
        return {
            error: {
                data: error, // Error data
                status: (error as ErrorInfo).httpStatusCode || 400, // HTTP status code
            },
        };
    }
}
