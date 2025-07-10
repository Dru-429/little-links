"use client"

import type React from "react"

import { useState } from "react"
import { Copy, Check, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function Form() {

    const [longUrl, setLongUrl] = useState("")
    const [customSlug, setCustomSlug] = useState("")
    const [shortenedUrl, setShortenedUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!longUrl.trim()) return;

        setIsLoading(true);

        try {
            const response = await fetch("/api/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    originalUrl: longUrl,
                    shortSlug: customSlug,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Something went wrong");
            }

            toast.success("Short URL created successfully 🎉");

            console.log("Shortened URL created:", result);
        } catch (error) {
            toast.error("Failed to shorten URL");
            console.error("Error creating short link:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shortenedUrl)
            setCopied(true)
            toast.success(
                "Copied to clipboard!",
                { description: "The shortened link has been copied." }
            )
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            toast.error(
                "Failed to copy",
                { description: "Please copy the link manually." }
            )
            console.log(err)
        }
    }

    const resetForm = () => {
        setLongUrl("")
        setCustomSlug("")
        setShortenedUrl("")
        setCopied(false)
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <Card className="shadow-xl border border-border bg-card backdrop-blur-sm">
                <CardHeader className="text-center pb-6">
                    <CardTitle className="text-3xl font-bold text-primary mb-2">Shorten Your Links</CardTitle>
                    <p className="text-muted-foreground text-lg">Transform long URLs into short, shareable links in seconds</p>
                </CardHeader>
                <CardContent className="space-y-6">
                    {!shortenedUrl ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    type="url"
                                    placeholder="Paste your long URL here…"
                                    value={longUrl}
                                    onChange={(e) => setLongUrl(e.target.value)}
                                    className="h-12 text-base bg-input/30 border-border focus:border-primary"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    type="text"
                                    placeholder="Custom alias (optional)"
                                    value={customSlug}
                                    onChange={(e) => setCustomSlug(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ""))}
                                    className="h-12 text-base bg-input/30 border-border focus:border-primary"
                                    maxLength={20}
                                />
                            </div>
                            <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                                        Shortening...
                                    </div>
                                ) : (
                                    <>
                                        <LinkIcon className="w-4 h-4 mr-2" />
                                        Shorten It
                                    </>
                                )}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-primary mb-2">Your shortened link is ready!</h3>
                                <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg border border-border">
                                    <Input value={shortenedUrl} readOnly className="border-0 bg-transparent text-center font-mono" />
                                    <Button
                                        onClick={copyToClipboard}
                                        variant="outline"
                                        size="sm"
                                        className="flex-shrink-0 bg-transparent"
                                    >
                                        {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </div>
                            <Button onClick={resetForm} variant="outline" className="w-full bg-transparent">
                                Shorten Another Link
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
