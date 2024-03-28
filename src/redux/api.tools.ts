import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition,
  QueryDefinition,
} from "@reduxjs/toolkit/query"
import type { ErrorInfo, FindOptions, Repository } from "remult"

type Pluralize<T extends string> = T extends `${infer S}s`
  ? `${S}ses` // Cases like "class" -> "classes"
  : T extends `${infer S}y`
  ? `${S}ies` // Cases like "category" -> "categories"
  : T extends `${infer S}`
  ? `${S}s` // Default pluralization
  : never

export type NameActions<
  EntityType,
  TagName extends string,
  ReducerPath extends string
> = {
  [K in `get${Capitalize<Pluralize<TagName>>}`]: QueryDefinition<
    FindOptions<EntityType>,
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      NonNullable<unknown>,
      FetchBaseQueryMeta
    >,
    TagName,
    EntityType[] | undefined,
    ReducerPath
  >
}
  & {
    [K in `add${Capitalize<TagName>}`]: MutationDefinition<
      Partial<EntityType>,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        unknown,
        FetchBaseQueryMeta
      >,
      TagName,
      EntityType,
      ReducerPath
    >
  } & {
    [K in `update${Capitalize<TagName>}`]: MutationDefinition<
      Partial<EntityType>,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        unknown,
        FetchBaseQueryMeta
      >,
      TagName,
      EntityType,
      ReducerPath
    >
  } & {
    [K in `delete${Capitalize<TagName>}`]: MutationDefinition<
      string | number | Partial<EntityType>,
      BaseQueryFn<
        string | FetchArgs,
        unknown,
        FetchBaseQueryError,
        unknown,
        FetchBaseQueryMeta
      >,
      TagName,
      void,
      ReducerPath
    >
  }

export function buildEndPoints<
  EntityType,
  TagName extends string,
  ReducerPath extends string
>(
  repo: Repository<EntityType>,
  tagName: TagName,
  build: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,

      object,
      FetchBaseQueryMeta
    >,
    TagName,
    ReducerPath
  >

): NameActions<EntityType, TagName, ReducerPath> {
  return {
    ["get" + tagName + "s"]: build.query({
      queryFn: async (options: FindOptions<EntityType>) => {
        return toQueryFn(() => repo.find({ ...options }))
      },
      providesTags: [tagName],
    }),
    ["add" + tagName]: build.mutation({
      queryFn: async (item: Partial<EntityType>) => {
        return toQueryFn(() => repo.insert(item))
      },
      invalidatesTags: [tagName],
    }),
    ["update" + tagName]: build.mutation({
      queryFn: async (item: Partial<EntityType>) => {
        return toQueryFn(() => repo.save(item))
      },
      invalidatesTags: [tagName],
    }),
    ["delete" + tagName]: build.mutation({
      queryFn: async (id: string | number | Partial<EntityType>) => {
        // @ts-expect-error id will work
        return toQueryFn(() => repo.delete(id))
      },
      invalidatesTags: [tagName],
    })
  } as NameActions<EntityType, TagName, ReducerPath>

}



export async function toQueryFn<T>(what: () => Promise<T>, repo?: Repository<T>) {
  try {
    let data = await what();
    if (repo)
      data = repo.toJson(data);

    return { data };
  } catch (error) {
    return {
      error: {
        data: error,
        status: (error as ErrorInfo).httpStatusCode || 400
      }
    };
  }
}