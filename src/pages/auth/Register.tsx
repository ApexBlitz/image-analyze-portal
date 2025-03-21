
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { LogIn, GithubIcon, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle, isAuthenticated } = useAuth();
  const { t, language } = useLanguage();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Create and validate form schema depending on the language
  const formSchema = z
    .object({
      name: z.string().min(2, language === "fr" ? "Le nom doit contenir au moins 2 caractères" : "Name must be at least 2 characters"),
      email: z.string().email(language === "fr" ? "Adresse email invalide" : "Invalid email address"),
      password: z
        .string()
        .min(6, language === "fr" ? "Le mot de passe doit contenir au moins 6 caractères" : "Password must be at least 6 characters"),
      confirmPassword: z.string(),
      terms: z.boolean().refine((val) => val === true, {
        message: language === "fr" ? "Vous devez accepter les conditions d'utilisation" : "You must accept the terms of use",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: language === "fr" ? "Les mots de passe ne correspondent pas" : "Passwords do not match",
      path: ["confirmPassword"],
    });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      await register(values.email, values.password, values.name);
      navigate("/");
    } catch (error) {
      // Error is already handled in the register function
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
        <h1 className="text-2xl font-bold">{t("auth.register.title")}</h1>
        <p className="text-gray-600 mt-2">
          {t("auth.register.subtitle")}
        </p>
      </div>

      <div className="space-y-6">
        <Button
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
        >
          <GithubIcon className="mr-2 h-4 w-4" />
          {t("auth.register.withGoogle")}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("auth.register.withEmail")}
            </span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.register.fullName")}</FormLabel>
                  <FormControl>
                    <Input placeholder="Jean Dupont" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.register.email")}</FormLabel>
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
                  <FormLabel>{t("auth.register.password")}</FormLabel>
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

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.register.confirmPassword")}</FormLabel>
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

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t("auth.register.terms")}{" "}
                      <Link
                        to="/terms"
                        className="text-blue-600 hover:underline"
                      >
                        {t("app.footer.terms")}
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                t("auth.register.submitting")
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  {t("auth.register.submit")}
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <p className="text-gray-600">
            {t("auth.register.haveAccount")}{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              {t("auth.register.login")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
