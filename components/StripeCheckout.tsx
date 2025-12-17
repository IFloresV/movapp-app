import { Colors } from "@/constants/Colors";
import Env from "@/utils/Config";
import { useStripe } from "@stripe/stripe-react-native";
import * as Linking from "expo-linking";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

type Props = {
   cart: any[];
   disabled?: boolean;
   onSuccess?: () => void;
   amountCents?: number;
   currency?: string;
   userId?: number;
   email?: string;
};

export default function StripeCheckout({
   cart,
   disabled,
   onSuccess,
   amountCents,
   currency: propCurrency,
   userId: propUserId,
   email: propEmail,
}: Props) {
   const { initPaymentSheet, presentPaymentSheet } = useStripe();
   const [loading, setLoading] = useState(false);

   // total en unidades (ej. 2200.00)
   const computeAmount = () => {
      const total = (cart || []).reduce((acc, it) => {
         const raw = it.precio ?? it.precio_mx ?? "0";
         const qty = it.quantity ?? 1;
         const n = Number(String(raw).replace(",", "").trim()) || 0;
         return acc + n * qty;
      }, 0);
      return Number(total.toFixed(2));
   };

   // opcional: mantener helper en céntimos si lo necesitas internamente
   const computeAmountCents = () => Math.round(computeAmount() * 100);

   const computedCurrency = (cart?.[0]?.moneda && String(cart[0].moneda).toUpperCase()) || "MXN";
   const currencyToUse = (propCurrency && String(propCurrency).toUpperCase()) || computedCurrency;

   const handleCheckout = async () => {
      if (!cart || cart.length === 0 || loading) return;

      setLoading(true);
      try {
         // enviar amount en unidades (ej. 2200.00). Si pasas amountCents como prop lo puedes convertir.
         const amountMajor = typeof amountCents === "number" ? Number((amountCents / 100).toFixed(2)) : computeAmount();
         const amountMinor = typeof amountCents === "number" ? amountCents : computeAmountCents();
         const apiUrl = Env.API_URL ?? "";
         const url = `${apiUrl.replace(/\/+$/, "")}/payments/stripe/create-intent`;
         // Enviar 'amount' en unidades; enviar amountCents también opcionalmente para compatibilidad
         const payload: any = { items: cart, currency: currencyToUse, amount: amountMajor, amountCents: amountMinor };

         // console.log("\x1b[33m", "payload  =>", payload);

         if (propEmail) payload.email = propEmail;
         if (propUserId) payload.userId = propUserId;
         console.log("\x1b[33m", "[StripeCheckout] POST", url, payload);

         const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
         });

         const text = await res.text();
         if (!res.ok) {
            console.error("[StripeCheckout] backend non-OK response:", res.status, text);
            throw new Error(`Backend error ${res.status}: ${text}`);
         }

         let json: any;
         try {
            json = JSON.parse(text);
         } catch (err) {
            console.error("[StripeCheckout] invalid JSON from backend:", text);
            throw new Error(`Respuesta no JSON del backend: ${text}`);
         }

         // console.log("[StripeCheckout] backend JSON:", json);

         const clientSecret = json?.clientSecret || json?.paymentIntent?.client_secret;
         if (!clientSecret) throw new Error("No se recibió clientSecret desde el backend");

         const returnUrl = Linking.createURL("stripe-redirect"); // ej. movapp://stripe-redirect

         const appearance = {
            colors: {
               // Fondo general del PaymentSheet
               background: Colors.movapp.background ?? "#000000",
               // Fondo de los componentes (inputs, tarjetas, secciones)
               componentBackground: Colors.movapp.card ?? "#0b0b0b",
               // Borde de los componentes
               componentBorder: Colors.movapp.borderCard ?? "#222222",
               // Color del texto principal dentro de inputs y componentes
               componentText: Colors.movapp.text ?? "#FFFFFF",
               // Color del texto primario (botones / labels)
               primaryText: Colors.movapp.text ?? "#FFFFFF",
               // Color principal (accent) usado en botones y highlights
               primary: Colors.movapp.primary ?? "#A78BFA",
               // Texto secundario
               secondaryText: Colors.movapp.primary ?? "#CBD5E1",
               // Placeholder inputs
               placeholderText: Colors.movapp.placeholderTextColor ?? "#6B7280",
               // Divider entre componentes
               componentDivider: Colors.movapp.borderCard ?? "#222222",
            },
            shapes: { borderRadius: 12 },
            primaryButton: {
               colors: { background: Colors.movapp.primary ?? "#A78BFA", text: "#ffffff" },
               shapes: { borderRadius: 10 },
            },
         };

         const initResult = await initPaymentSheet({
            paymentIntentClientSecret: clientSecret,
            merchantDisplayName: "MovApp",
            returnURL: returnUrl,
            appearance,
         });

         if (initResult.error) throw initResult.error;

         const { error: presentError } = await presentPaymentSheet();
         if (presentError) {
            // el usuario cerró/canceló el flujo
            if ((presentError as any).code === "Canceled" || /cancel/i.test(presentError.message || "")) {
               Alert.alert("Pago cancelado", "Has cancelado el proceso de pago.");
               return;
            }
            throw presentError;
         }

         onSuccess?.();
         // Alert.alert("Pago exitoso", "Gracias por tu compra.");
      } catch (err: any) {
         console.error("StripeCheckout error:", err?.message);
         Alert.alert("Error pago", "Ocurrió un error al procesar el pago");
      } finally {
         setLoading(false);
      }
   };

   return (
      <View className="w-full">
         <TouchableOpacity
            className={`py-4 rounded-xl items-center ${disabled || loading ? "opacity-60" : ""}`}
            style={{ backgroundColor: Colors.movapp.primary }}
            onPress={handleCheckout}
            disabled={disabled || loading}
         >
            <Text className="text-white text-lg font-bold">{loading ? "Procesando..." : "Proceder con el pago"}</Text>
         </TouchableOpacity>
      </View>
   );
}
