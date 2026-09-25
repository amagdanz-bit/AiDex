/**
 * SQL language configuration for AiDex
 *
 * Grammar: @derekstride/tree-sitter-sql (dialect-agnostic, PostgreSQL/MySQL/SQLite/T-SQL subset).
 * Reserved words are separate `keyword_*` nodes in this grammar, so they never reach
 * the identifier filter. The keyword set below only catches built-in functions and
 * non-reserved words that the grammar parses as plain identifiers.
 */

/**
 * Built-in functions and common non-reserved words (compared lowercase — SQL is case-insensitive)
 */
export const SQL_KEYWORDS = new Set([
    // Aggregates
    'count', 'sum', 'avg', 'min', 'max', 'array_agg', 'string_agg', 'group_concat',
    'json_agg', 'jsonb_agg', 'bool_and', 'bool_or', 'every', 'listagg',

    // Window functions
    'row_number', 'rank', 'dense_rank', 'ntile', 'lag', 'lead',
    'first_value', 'last_value', 'nth_value', 'percent_rank', 'cume_dist',

    // Scalar / string
    'coalesce', 'nullif', 'ifnull', 'isnull', 'nvl', 'greatest', 'least',
    'lower', 'upper', 'length', 'len', 'substr', 'substring', 'trim', 'ltrim', 'rtrim',
    'replace', 'concat', 'concat_ws', 'position', 'strpos', 'instr', 'left', 'right',
    'lpad', 'rpad', 'split_part', 'regexp_replace', 'format', 'to_char', 'to_number',
    'abs', 'ceil', 'ceiling', 'floor', 'round', 'trunc', 'mod', 'power', 'sqrt', 'random',

    // Date / time
    'now', 'current_date', 'current_time', 'current_timestamp', 'getdate', 'sysdate',
    'date_trunc', 'date_part', 'extract', 'dateadd', 'datediff', 'to_date', 'to_timestamp',
    'age', 'strftime', 'datetime', 'julianday',

    // JSON
    'json_build_object', 'jsonb_build_object', 'json_extract', 'to_json', 'to_jsonb',
    'jsonb_set', 'json_object', 'json_array',

    // Misc
    'cast', 'convert', 'exists', 'generate_series', 'unnest', 'uuid_generate_v4',
    'gen_random_uuid', 'nextval', 'currval', 'setval', 'last_insert_id', 'scope_identity',

    // Procedural languages / common identifiers in DDL clauses
    'sql', 'plpgsql', 'plpython3u', 'excluded', 'new', 'old',
]);

/**
 * Tree-sitter node types that represent identifiers in SQL
 */
export const SQL_IDENTIFIER_NODES = new Set([
    'identifier',
]);

/**
 * Tree-sitter node types for comments (`-- line` and `/* block *\/`)
 */
export const SQL_COMMENT_NODES = new Set([
    'comment',
    'marginalia',
]);

/**
 * Tree-sitter node types for routines — treated as "methods" for indexing
 */
export const SQL_METHOD_NODES = new Set([
    'create_function',
    'create_trigger',
]);

/**
 * Tree-sitter node types for schema objects — treated as "types" for indexing
 */
export const SQL_TYPE_NODES = new Set([
    'create_table',
    'create_view',
    'create_materialized_view',
    'create_type',
    'create_sequence',
]);

/**
 * Tree-sitter node types for column definitions
 */
export const SQL_PROPERTY_NODES = new Set([
    'column_definition',
]);

/**
 * Check if a term is an SQL built-in (case-insensitive)
 */
export function isKeyword(term: string): boolean {
    return SQL_KEYWORDS.has(term.toLowerCase());
}

/**
 * Strip identifier quoting: "name", `name`, [name]
 */
export function unquoteIdentifier(text: string): string {
    if (text.length >= 2) {
        const first = text[0];
        const last = text[text.length - 1];
        if ((first === '"' && last === '"') || (first === '`' && last === '`') || (first === '[' && last === ']')) {
            return text.slice(1, -1);
        }
    }
    return text;
}
