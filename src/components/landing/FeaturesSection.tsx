import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  Users, 
  Lock, 
  Activity, 
  FileText,
  Upload,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Dashboard Overview",
    description: "Visualize total containers, files, storage size, and recent activity with beautiful charts and real-time metrics.",
    color: "from-blue-400 to-cyan-500",
  },
  {
    icon: Upload,
    title: "Container Management",
    description: "List, search, create, edit, and delete containers. View metadata, access levels, and file counts with ease.",
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: FileText,
    title: "File Previews",
    description: "Browse files within containers, preview files directly in cards, and manage file actions efficiently.",
    color: "from-green-400 to-emerald-500",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Role-based access control for admins, uploaders, and viewers. Manage users and permissions securely.",
    color: "from-orange-400 to-red-500",
  },
  {
    icon: Activity,
    title: "Activity Metrics",
    description: "Track uploads, downloads, deletions, and storage usage over time with interactive charts and analytics.",
    color: "from-indigo-400 to-purple-500",
  },
  {
    icon: Lock,
    title: "Audit Logs",
    description: "Review system and user actions for compliance and troubleshooting with comprehensive logging.",
    color: "from-pink-400 to-purple-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              BlobNest?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Professional-grade Azure Blob Storage management with enterprise security and intuitive design
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Additional features highlight */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 md:p-12">
              <div className="text-center space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold">
                  ☁️ Enterprise Ready
                </h3>
                <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                  Built for teams and organizations managing Azure Blob Storage at scale. 
                  Secure, reliable, and designed for professional use.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">🔒</div>
                    <div className="opacity-90">Enterprise Security</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">📱</div>
                    <div className="opacity-90">Responsive Design</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">⚡</div>
                    <div className="opacity-90">Real-time Updates</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
} 