import { InjectionToken } from "@angular/core";

interface ApiUrlConfig {
    url: String
}

export const ApiUrl = new InjectionToken<ApiUrlConfig>('ApiToken')