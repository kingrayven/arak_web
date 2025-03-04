import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { AlertTriangle, Wine } from "lucide-react";

interface AgeVerificationModalProps {
  isOpen?: boolean;
  onVerify?: () => void;
  onReject?: () => void;
}

const AgeVerificationModal = ({
  isOpen = true,
  onVerify = () => {},
  onReject = () => {},
}: AgeVerificationModalProps) => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Generate arrays for days, months, and years
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => String(currentYear - i));

  const handleVerify = () => {
    if (!day || !month || !year) {
      setError("Please complete all date fields");
      return;
    }

    const birthDate = new Date(
      parseInt(year),
      months.indexOf(month),
      parseInt(day),
    );
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      // Not yet had birthday this year
      const calculatedAge = age - 1;
      if (calculatedAge < 21) {
        setError("You must be 21 or older to enter this site");
        return;
      }
    } else if (age < 21) {
      setError("You must be 21 or older to enter this site");
      return;
    }

    // If remember me is checked, store in localStorage
    if (rememberMe) {
      localStorage.setItem("ageVerified", "true");
    }

    onVerify();
  };

  const handleReject = () => {
    onReject();
  };

  // Check if user has already verified age
  useEffect(() => {
    const verified = localStorage.getItem("ageVerified");
    if (verified === "true") {
      onVerify();
    }
  }, [onVerify]);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full w-16 h-16 flex items-center justify-center">
            <Wine className="h-8 w-8 text-amber-600 dark:text-amber-500" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Age Verification
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400 mt-2">
            You must be 21 years or older to enter this site. Please verify your
            age.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger id="day">
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((d) => (
                      <SelectItem key={d} value={d}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={month} onValueChange={setMonth}>
                  <SelectTrigger id="month">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((y) => (
                      <SelectItem key={y} value={y}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-md">
              <AlertTriangle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me on this device
            </label>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400">
            By entering this site, you are agreeing to our{" "}
            <a
              href="#"
              className="underline text-amber-600 hover:text-amber-700"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="underline text-amber-600 hover:text-amber-700"
            >
              Privacy Policy
            </a>
            .
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full" onClick={handleReject}>
            Exit
          </Button>
          <Button
            className="w-full bg-amber-600 hover:bg-amber-700"
            onClick={handleVerify}
          >
            I am 21 or older
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AgeVerificationModal;
