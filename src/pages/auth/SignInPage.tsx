import React, {useState} from "react";
import {
    Box,
    Typography,
    TextField, IconButton,
} from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import {useNavigate, useRevalidator} from "react-router-dom";
import {ApiAuthProvider} from "@/security/auth";
import {toast} from "react-toastify";

const SignInPage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const revalidator = useRevalidator();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        setIsLoading(true);
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const username = data.get('username')?.toString().trim() ?? '';
        const password = data.get('password')?.toString().trim() ?? '';

        if ('' === username || '' === password) {
            setIsLoading(false);
            toast.error('Empty credentials.');
            return;
        }

        try {
            await ApiAuthProvider.signIn(username, password);
            revalidator.revalidate();
            navigate("/");
        } catch (e:any) {
            setIsLoading(false);
            console.log(e.message);
            toast.error(e.message);
            return;
        }

        setIsLoading(false);
    }

    return (
        <Box
            component={"div"}
        >
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    textAlign: "center",
                }}
            >
                Sign in
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {/*<Box sx={{ mt: 1 }}>*/}
            {/*    <Form replace>*/}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Email Address"
                        name="username"
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
                {/*</Form>*/}
            </Box>
        </Box>
    )
}

export default SignInPage;