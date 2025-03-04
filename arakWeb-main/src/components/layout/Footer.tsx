import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">LiquorStore</h3>
            <p className="text-gray-400">
              "Jack Daniel's: Every day we make it, we’ll make it the best we can."
              <br />
              "Always remember drink responsibly!"
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/wine"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Wine
                </Link>
              </li>
              <li>
                <Link
                  to="/beer"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Beer
                </Link>
              </li>
              <li>
                <Link
                  to="/spirits"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Spirits
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="text-gray-400 hover:text-amber-500 transition-colors"
                >
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-gray-400">
                  Libtong, Tagudin, Ilocos Sur
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-gray-400">+63 9157984018</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-amber-500" />
                <span className="text-gray-400">@drizzle.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-gray-400">
              Subscribe to receive updates on new products and special offers of our online liqour store Drizzle!.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-gray-200 rounded-r-none focus-visible:ring-amber-500"
              />
              <Button className="bg-amber-600 hover:bg-amber-700 rounded-l-none">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Drizzle. All rights reserved.</p>
          <p className="mt-2">
            <Link
              to="/privacy"
              className="hover:text-amber-500 transition-colors"
            >
              Privacy Policy
            </Link>{" "}
            |
            <Link
              to="/terms"
              className="hover:text-amber-500 transition-colors ml-2"
            >
              Terms of Service
            </Link>{" "}
            |
            <Link
              to="/admin/login"
              className="hover:text-amber-500 transition-colors ml-2"
            >
              Store Manager: Revin King M. Lorena
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
