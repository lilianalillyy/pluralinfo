export enum Visibility {
    Trusted = 'Trusted',
    Private = 'Private',
    Public = 'Public'
}

export interface MemberFieldData {
    description: string,
    visible: boolean
}

export enum MemberFieldType {
    String = 'String',
    Color = 'Color',
    Date = 'Date',
    Month = 'Month',
    Year = 'Year',
    MonthYear = 'MonthYear',
    Timestamp = 'Timestamp',
    MonthDay = 'MonthDay'
}

export interface MemberField {
    fieldId: string,
    name: string,
    position: number,
    type: MemberFieldType,
    pluralVisibility: Visibility
    data: MemberFieldData
}

export interface MemberFieldWithValue extends MemberField {
    value: string
}

export interface User {
    id: string
    username: string
    pluralKey: string
    overridePluralId: string|null
    admin: boolean
}

export interface SystemData {
    slug: string,
    description: string,
    visible: boolean,
}

export interface System {
    id: string,
    lastModified: Date,
    username: string,
    fields: MemberField[],
    color: string | null,
    description: string | null,
    avatar: string | null
    data: SystemData
}

export interface MemberData {
    slug: string
    description: string,
    visible: boolean
}

export interface Member {
    id: string,
    systemId: string,
    name: string,
    pronouns: string|null,
    pluralVisibility: Visibility,
    lastModified: Date,
    color: string|null,
    description: string|null,
    fields: MemberFieldWithValue[],
    avatar: string|null
    data: MemberData
}