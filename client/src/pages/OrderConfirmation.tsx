import { useEffect, useState } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, ArrowRight, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";

export default function OrderConfirmation() {
    const [, setLocation] = useLocation();
    const searchString = useSearch();
    const { clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(true);
    const [orderDetails, setOrderDetails] = useState<{
        sessionId: string | null;
        customerEmail?: string;
    }>({ sessionId: null });

    useEffect(() => {
        // Parse session_id from URL
        const params = new URLSearchParams(searchString);
        const sessionId = params.get("session_id");

        if (sessionId) {
            setOrderDetails({ sessionId });
            // Clear the cart after successful order
            clearCart();
        }

        // Simulate loading for smooth transition
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [searchString, clearCart]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                        <p className="text-lg text-muted-foreground">Processing your order...</p>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow container py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl mx-auto"
                >
                    <Card className="border-t-4 border-t-green-500 shadow-lg">
                        <CardHeader className="text-center pb-2">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="mx-auto mb-4"
                            >
                                <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                                    <CheckCircle className="h-12 w-12 text-green-500" />
                                </div>
                            </motion.div>
                            <CardTitle className="text-3xl font-display font-bold uppercase text-green-600">
                                Order Confirmed!
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="text-center space-y-6 pt-4">
                            <p className="text-lg text-muted-foreground">
                                Thank you for your purchase! Your order has been successfully placed.
                            </p>

                            {orderDetails.sessionId && (
                                <div className="bg-muted/50 p-4 rounded-lg">
                                    <p className="text-sm text-muted-foreground mb-1">Order Reference</p>
                                    <p className="font-mono text-sm break-all">
                                        {orderDetails.sessionId.slice(0, 30)}...
                                    </p>
                                </div>
                            )}

                            <div className="border-t border-b py-6 space-y-4">
                                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                                    <Package className="h-5 w-5" />
                                    <span>You will receive a confirmation email shortly</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4">
                                <h3 className="font-bold text-lg">What's Next?</h3>
                                <ul className="text-left text-muted-foreground space-y-3 max-w-md mx-auto">
                                    <li className="flex items-start gap-3">
                                        <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            1
                                        </span>
                                        <span>
                                            Check your email for order confirmation and tracking details
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            2
                                        </span>
                                        <span>
                                            Your order will be processed and shipped within 1-2 business days
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                                            3
                                        </span>
                                        <span>
                                            Contact us if you have any questions about your order
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button
                                    onClick={() => setLocation("/products")}
                                    variant="outline"
                                    className="flex-1 h-12 font-display uppercase"
                                >
                                    Continue Shopping
                                </Button>
                                <Button
                                    onClick={() => setLocation("/contact")}
                                    className="flex-1 h-12 font-display uppercase"
                                >
                                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-muted-foreground">
                            Need help?{" "}
                            <Button
                                variant="link"
                                className="p-0 h-auto"
                                onClick={() => setLocation("/contact")}
                            >
                                Contact our support team
                            </Button>
                        </p>
                    </motion.div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
