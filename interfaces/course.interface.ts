export enum PageLevelCategory {
    Courses,
    Services,
    Books,
    Products
}

export interface CourseAdvantage {
    _id: string;
    title: string;
    description: string;
}

export interface HHData {
    _id: string;
    count: number;
    juniorSalary: number;
    middleSalary: number;
    seniorSalary: number;
    updatedAt: Date;
}

export interface CourseModel {
    tags: string[];
    _id: string;
    secondCategory: string;
    alias: string;
    title: string;
    category: string;
    seoText?: string;
    tagsTitle: string;
    metatitle: string;
    metaDescription: string;
    firstCategory: PageLevelCategory;
    advantages?: CourseAdvantage[];
    createdAt: Date;
    updatedAt: Date;
    hh?: HHData;
}