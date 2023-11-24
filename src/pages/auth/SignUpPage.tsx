import React, {useState} from "react";
import {toast} from "react-toastify";
import {ApiAuthProvider} from "@/security/auth";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Container,
    Typography,
    TextField, IconButton,
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

const SignUpPage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        setIsLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const email = data.get('email')?.toString() ?? '';
        const password = data.get('password')?.toString() ?? '';

        if ('' === email || '' === password) {
            setIsLoading(false);
            toast.error('Empty credentials.');
            return;
        }

        try {
            await ApiAuthProvider.signUp(email, password);
            navigate("/signin");
        } catch (e:any) {
            setIsLoading(false);
            toast.error(e.message);
            return;
        }

        setIsLoading(false);
    }

    return (
        <Container
            maxWidth="xs"
            component={"div"}
        >
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    textAlign: "center",
                }}
            >
                Sign up
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />

                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <IconButton
                        disabled={isLoading}
                        type="submit"
                        size="large"
                        aria-label="login"
                        aria-haspopup="true"
                        color="inherit"
                        sx={{
                            m: 2,
                            boxShadow: "0 1px 2px rgba(30,30,30,0.35)",
                            transition: "box-shadow 0.3s ease-in-out",
                        }}
                    >
                        {!isLoading ? (<LoginIcon/>) : (<HourglassBottomIcon />)}
                    </IconButton>
                </Box>
            </Box>
        </Container>
    );
}

export default SignUpPage;
