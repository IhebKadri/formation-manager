import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Structures } from "@/features/structures";
import { Profils } from "@/features/profils/components/Profils";
import { Domaines } from "@/features/domaine";
import { Employeurs } from "@/features/employeur";
import { Building2, Briefcase, BookOpen, Building } from "lucide-react";

export const ReferentialPage = () => {

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Référentiels</h1>
        <p className="text-muted-foreground text-sm">
          Gérez les structures et les profils de votre organisation
        </p>
      </div>

      <Tabs defaultValue="structures" className="w-full">
        <TabsList className="grid w-full max-w-[800px] grid-cols-4 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger 
            value="structures" 
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <Building2 className="mr-2 size-4" />
            Structures
          </TabsTrigger>
          <TabsTrigger 
            value="profils"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <Briefcase className="mr-2 size-4" />
            Profils
          </TabsTrigger>
          <TabsTrigger 
            value="domaines" 
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <BookOpen className="mr-2 size-4" />
            Domaines
          </TabsTrigger>
          <TabsTrigger 
            value="employeurs" 
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <Building className="mr-2 size-4" />
            Employeurs
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="structures" className="mt-0 outline-none">
            <Structures />
          </TabsContent>
          
          <TabsContent value="profils" className="mt-0 outline-none">
            <Profils />
          </TabsContent>

          <TabsContent value="domaines" className="mt-0 outline-none">
            <Domaines />
          </TabsContent>

          <TabsContent value="employeurs" className="mt-0 outline-none">
            <Employeurs />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
