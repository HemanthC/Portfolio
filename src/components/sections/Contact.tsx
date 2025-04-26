// src/components/sections/Contact.tsx
"use client";

import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import emailjs from "@emailjs/browser";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formRef = useScrollAnimation<HTMLFormElement>({
    type: "slide-right",
    threshold: 0.1,
  });

  const infoRef = useScrollAnimation<HTMLDivElement>({
    type: "slide-left",
    threshold: 0.1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_topx7mc", // From EmailJS dashboard
        "template_7aagk7l", // From EmailJS dashboard
        formRef.current as HTMLFormElement,
        "4gF3xEzudabt8edCO" // From EmailJS dashboard
      )
      .then((result) => {
        console.log("Email sent successfully:", result.text);
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          if (formRef.current) formRef.current.reset();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error sending email:", error.text);
        setIsSubmitting(false);
        // Add error handling if needed
      });
  };

  return (
    <section id="contact" className="py-20  bg-muted/30">
      <div className="container px-4 mx-auto">
        <SectionTitle
          title="Get in Touch"
          subtitle="Let's work together"
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            ref={infoRef}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-display">
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Feel free to reach out with any questions or opportunities.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href="mailto:kartik.spgk@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      kartik.spgk@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a
                      href="tel:+918223027506"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +91 8223027506
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-primary/10 rounded-lg text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">
                      Belagavi, Karnataka, India
                    </p>
                  </div>
                </div>

                <div className="pt-6">
                  <h3 className="font-semibold mb-4">Social Profiles</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="https://github.com/Kartik-Murthy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-card hover:bg-muted rounded-full transition-colors"
                    >
                      <FontAwesomeIcon icon={faGithub} size="xl" />
                    </Link>
                    <Link
                      href="https://linkedin.com/in/kartik10"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-card hover:bg-muted rounded-full transition-colors"
                    >
                      <FontAwesomeIcon icon={faLinkedin} size="xl" />
                    </Link>
                    <Link
                      href="mailto:kartik.spgk@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-card hover:bg-muted rounded-full transition-colors"
                    >
                      <Mail size={24} />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="text-center mb-8 mt-4">
              <h2 className="text-2xl font-semibold text-primary">
                Send Me a Message
              </h2>
              <p className="text-muted-foreground mt-4">
                I'm here to help with any inquiries, questions, or projects!
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="How can I help you?"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell me about your project or inquiry..."
                rows={5}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              className={cn(
                "w-full transition-all",
                isSubmitted ? "bg-green-600 hover:bg-green-700" : ""
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending message...
                </span>
              ) : isSubmitted ? (
                <span className="flex items-center">
                  <Check className="mr-2 h-4 w-4" />
                  Message sent!
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
