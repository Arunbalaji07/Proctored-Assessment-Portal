interface jwtPayload {
    id: string;
    fullName: string;
    email: string;
    role: "admin" | "educator" | "student";
}