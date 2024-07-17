export const ACCESS_LEVEL_ADMIN = 'admin';
export const ACCESS_LEVEL_TECH = 'tech';
export const ACCESS_LEVEL_USER = 'user';

export type AccessLevel = typeof ACCESS_LEVEL_ADMIN | typeof ACCESS_LEVEL_TECH | typeof ACCESS_LEVEL_USER;

export const RAA_ADDRESS = {
    locationName: "Radios Across America LLC",
    streetAddress: "21725 N. 20th Ave.",
    addressSuite: "Suite 101-102 #1024",
    city: "Phoenix",
    state: "AZ",
    zip: "85027-2640",
    phone: "(623)255-GMRS(4677)",
    email: "info@radiosacrossamerica.com"
};
export const TECH_ADDRESS = {
    locationName: "Marty's Radio Shop",
    streetAddress: "12635 W Prospect Dr",
    addressSuite: "",
    city: "Sun City West",
    state: "AZ",
    zip: "85375",
    phone: "623.231.6751",
    email: "umanmc@gmail.com"
}