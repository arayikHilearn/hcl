export type CamelizeString<T extends PropertyKey, C extends string = ''> =
    T extends string ? string extends T ? string :
        T extends `${infer F}_${infer R}` ?
            CamelizeString<Capitalize<R>, `${C}${F}`> : `${C}${T}` : T;

export type WithPrefix<P extends string, V extends string = string> = `${P}${V}`;
