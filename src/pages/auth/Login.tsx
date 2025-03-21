
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LogIn, GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  const { t, language } = useLanguage();

  // Create and validate form schema depending on the language
  const formSchema = z.object({
    email: z.string().email(language === "fr" ? "Adresse email invalide" : "Invalid email address"),
    password: z
      .string()
      .min(6, language === "fr" ? "Le mot de passe doit contenir au moins 6 caractères" : "Password must be at least 6 characters"),
  });

  type FormValues = z.infer<typeof formSchema>;

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await login(values.email, values.password);
      navigate("/");
    } catch (error) {
      // Error is already handled in the login function
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      // Error is already handled in the loginWithGoogle function
    }
  };

  return (
    <div className="container max-w-md mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{t("auth.login.title")}</h1>
        <p className="text-gray-600 mt-2">
          {t("auth.login.subtitle")}
        </p>
      </div>

      <div className="space-y-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <GithubIcon className="mr-2 h-4 w-4" />
          {t("auth.login.withGoogle")}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("auth.login.withEmail")}
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.login.email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="exemple@email.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.login.password")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                t("auth.login.submitting")
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  {t("auth.login.submit")}
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            {t("auth.login.noAccount")}{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              {t("auth.login.createAccount")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
