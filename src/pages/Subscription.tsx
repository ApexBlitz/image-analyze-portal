import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Subscription = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const plans = [
    {
      id: "free",
      name: t("subscription.plans.free.name"),
      price: t("subscription.plans.free.price"),
      description: t("subscription.plans.free.description"),
      features: [
        t("subscription.plans.free.features.f1"),
        t("subscription.plans.free.features.f2"),
        t("subscription.plans.free.features.f3"),
      ],
      limitations: [
        t("subscription.plans.free.limitations.l1"),
      ],
      buttonText: t("subscription.plans.free.button"),
      popular: false,
    },
    {
      id: "pro",
      name: t("subscription.plans.pro.name"),
      price: t("subscription.plans.pro.price"),
      description: t("subscription.plans.pro.description"),
      features: [
        t("subscription.plans.pro.features.f1"),
        t("subscription.plans.pro.features.f2"),
        t("subscription.plans.pro.features.f3"),
        t("subscription.plans.pro.features.f4"),
        t("subscription.plans.pro.features.f5"),
      ],
      buttonText: t("subscription.plans.pro.button"),
      popular: true,
    },
    {
      id: "enterprise",
      name: t("subscription.plans.enterprise.name"),
      price: t("subscription.plans.enterprise.price"),
      description: t("subscription.plans.enterprise.description"),
      features: [
        t("subscription.plans.enterprise.features.f1"),
        t("subscription.plans.enterprise.features.f2"),
        t("subscription.plans.enterprise.features.f3"),
        t("subscription.plans.enterprise.features.f4"),
      ],
      buttonText: t("subscription.plans.enterprise.button"),
      popular: false,
    },
  ];

  const handleSubscribe = (planId: string) => {
    if (!isAuthenticated) {
      toast.error(t("subscription.loginRequired"));
      navigate("/login", { state: { from: "/subscription" } });
      return;
    }

    const successMessage = t("subscription.successToast").replace("{{plan}}", planId);
    toast.success(successMessage);
  };

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-gray-100 -z-10"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t("subscription.title")}</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("subscription.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden border ${
                plan.popular 
                  ? "border-blue-400 shadow-lg" 
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs uppercase font-semibold py-1 px-3 rounded-bl-lg">
                  {t("subscription.popular")}
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{plan.name}</span>
                </CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.id !== "enterprise" && (
                    <span className="text-gray-500 ml-1">{t("subscription.perMonth")}</span>
                  )}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.limitations && plan.limitations.map((limitation, index) => (
                    <li key={`lim-${index}`} className="flex items-start text-gray-500">
                      <Info className="h-5 w-5 text-gray-400 mr-2 shrink-0 mt-0.5" />
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full ${
                    plan.popular 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : plan.id === "free" 
                        ? "bg-gray-100 text-gray-800 hover:bg-gray-200" 
                        : ""
                  }`}
                  variant={plan.id === "free" ? "outline" : "default"}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">{t("subscription.faq.title")}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-2">{t("subscription.faq.q1")}</h3>
              <p className="text-gray-600">{t("subscription.faq.a1")}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">{t("subscription.faq.q2")}</h3>
              <p className="text-gray-600">{t("subscription.faq.a2")}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">{t("subscription.faq.q3")}</h3>
              <p className="text-gray-600">{t("subscription.faq.a3")}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">{t("subscription.faq.q4")}</h3>
              <p className="text-gray-600">{t("subscription.faq.a4")}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Subscription;
