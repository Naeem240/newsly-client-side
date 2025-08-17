import useAuth from "./useAuth";

export default function usePremium() {
    const { user } = useAuth();
    if (!user) return false;

    if (user.premiumTaken) {
        const premiumUntil = new Date(user.premiumTaken);
        return new Date() < premiumUntil;
    }

    return false;
}
