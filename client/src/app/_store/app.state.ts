import { UserState } from "./_user-store/user.reducers";
import { RepairState } from "./_repair-store/repair.reducers";
import { RadioState } from "./_radio-store/radio.reducers";
import { OrgState } from "./_org-store/org.reducers";
import { AuthState } from "./_auth-store/auth.reducers";
import { NavState } from "./_nav-store/nav.reducers";
import { LocationState } from "./_location-store/location.reducers";

export interface AppState {
    auth: AuthState,
    nav: NavState,
    org: OrgState,
    location: LocationState,
    radio: RadioState,
    repair: RepairState,
    user: UserState
}