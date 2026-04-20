import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Structures, useStructures } from "@/features/structures";
import { Profils } from "@/features/profils/components/Profils";
import { Building2, Briefcase } from "lucide-react";

export default function ReferentialPage() {
  const { data: structures = [], isLoading: isStructuresLoading } = useStructures();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Référentiels</h1>
        <p className="text-muted-foreground text-sm">
          Gérez les structures et les profils de votre organisation
        </p>
      </div>

      <Tabs defaultValue="structures" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2 p-1 bg-muted/50 rounded-xl">
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
        </TabsList>
        <div className="mt-6">
          <TabsContent value="structures" className="mt-0 focus-visible:outline-none">
            <Structures structures={structures} isLoading={isStructuresLoading} />
          </TabsContent>
          <TabsContent value="profils" className="mt-0 focus-visible:outline-none">
            <Profils />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
