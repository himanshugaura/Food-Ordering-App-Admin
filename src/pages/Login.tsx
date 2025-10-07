import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShineBorder } from "@/components/ui/shine-border"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Eye, EyeOff, Loader } from "lucide-react"
import { useAppDispatch } from "@/store/hook"
import { login } from "@/api/auth"

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [errors, setErrors] = useState({ username: "", password: "" })
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    const newErrors = { username: "", password: "" }
    if (!formData.username) {
      newErrors.username = "Username is required"
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    }
    
    setErrors(newErrors)
    
    if (!newErrors.username && !newErrors.password) {
      try {
        setIsLoading(true);
        await dispatch(login(formData.username, formData.password));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error("Login failed:", error);
      } finally {
        setIsLoading(false);
      }
      
    }
  }

  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const key = id as keyof typeof formData;
    setFormData(prev => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: "" }))
    }
  }

  const handleKeyPress = (e :  React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center p-4 sm:p-6 md:p-8 antialiased overflow-hidden">
      <AnimatedGridPattern
        numSquares={50}
        opacity={0.35}
        duration={2}
        repeatDelay={0.5}
        className={cn(
          "[mask-image:radial-gradient(100vw_circle_at_center,white,transparent)]",
          "md:[mask-image:radial-gradient(100vw_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-20%] h-[140%]",
          "md:inset-y-[-30%] md:h-[200%] md:skew-y-12"
        )}
      />
      <div className="relative w-full max-w-[440px] flex flex-col gap-6 sm:gap-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Enter your credentials to access your account
          </p>
        </div>
        
        <Card className="relative w-full overflow-hidden bg-transparent border-slate-700/50 shadow-2xl">
          <ShineBorder shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
          
          <CardContent className="pb-6 sm:pb-8 px-6 sm:px-8 pt-8 sm:pt-10">
          <div className="grid gap-5 sm:gap-6">
            <div className="grid gap-2.5">
              <Label 
                htmlFor="username" 
                className="text-slate-200 font-medium text-sm"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`h-12 sm:h-13 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 rounded-lg ${
                  errors.username ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""
                }`}
              />
              {errors.username && (
                <span className="text-red-400 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                  {errors.username}
                </span>
              )}
            </div>
            
            <div className="grid gap-2.5">
              <div className="flex items-center justify-between">
                <Label 
                  htmlFor="password" 
                  className="text-slate-200 font-medium text-sm"
                >
                  Password
                </Label>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  className={`h-12 sm:h-13 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200 pr-12 rounded-lg ${
                    errors.password ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors duration-200 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 text-xs sm:text-sm animate-in fade-in slide-in-from-top-1 duration-200">
                  {errors.password}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="px-6 sm:px-8 pb-8 sm:pb-10">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-12 sm:h-13 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-semibold shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 active:scale-[0.98] text-sm sm:text-base rounded-lg"
          >
            {isLoading ? (
              <span className="flex items-center gap-2.5">
               <Loader className="h-5 w-5 animate-spin" />
                Logging In...
              </span>
            ) : (
              "Log In"
            )}
          </Button>
        </CardFooter>
      </Card>
      </div>
    </div>
  )
}

export default Login