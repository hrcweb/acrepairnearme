import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, ThermometerSun, MapPin, TrendingUp } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from "recharts";

interface HeatData {
  date: string;
  temperature: number;
  heatIndex: number;
  acUsage: number;
  city: string;
}

// Comprehensive Florida zip code to city mapping
const floridaZipCodes: Record<string, string> = {
  // Miami-Dade County
  "33101": "Miami", "33102": "Miami", "33109": "Miami", "33111": "Miami", "33112": "Miami",
  "33114": "Miami", "33116": "Miami", "33119": "Miami", "33122": "Miami", "33125": "Miami",
  "33126": "Miami", "33127": "Miami", "33128": "Miami", "33129": "Miami", "33130": "Miami",
  "33131": "Miami", "33132": "Miami", "33133": "Miami", "33134": "Miami", "33135": "Miami",
  "33136": "Miami", "33137": "Miami", "33138": "Miami", "33139": "Miami", "33140": "Miami",
  "33141": "Miami", "33142": "Miami", "33143": "Miami", "33144": "Miami", "33145": "Miami",
  "33146": "Miami", "33147": "Miami", "33149": "Miami", "33150": "Miami", "33151": "Miami",
  "33152": "Miami", "33153": "Miami", "33154": "Miami", "33155": "Miami", "33156": "Miami",
  "33157": "Miami", "33158": "Miami", "33159": "Miami", "33160": "Miami", "33161": "Miami",
  "33162": "Miami", "33163": "Miami", "33164": "Miami", "33165": "Miami", "33166": "Miami",
  "33167": "Miami", "33168": "Miami", "33169": "Miami", "33170": "Miami", "33172": "Miami",
  "33173": "Miami", "33174": "Miami", "33175": "Miami", "33176": "Miami", "33177": "Miami",
  "33178": "Miami", "33179": "Miami", "33180": "Miami", "33181": "Miami", "33182": "Miami",
  "33183": "Miami", "33184": "Miami", "33185": "Miami", "33186": "Miami", "33187": "Miami",
  "33188": "Miami", "33189": "Miami", "33190": "Miami", "33193": "Miami", "33194": "Miami",
  "33195": "Miami", "33196": "Miami", "33197": "Miami", "33199": "Miami",
  
  // Fort Lauderdale area
  "33301": "Fort Lauderdale", "33302": "Fort Lauderdale", "33303": "Fort Lauderdale", 
  "33304": "Fort Lauderdale", "33305": "Fort Lauderdale", "33306": "Fort Lauderdale",
  "33307": "Fort Lauderdale", "33308": "Fort Lauderdale", "33309": "Fort Lauderdale",
  "33310": "Fort Lauderdale", "33311": "Fort Lauderdale", "33312": "Fort Lauderdale",
  "33313": "Fort Lauderdale", "33314": "Fort Lauderdale", "33315": "Fort Lauderdale",
  "33316": "Fort Lauderdale", "33317": "Fort Lauderdale", "33318": "Fort Lauderdale",
  "33319": "Fort Lauderdale", "33320": "Fort Lauderdale", "33321": "Fort Lauderdale",
  "33322": "Fort Lauderdale", "33323": "Fort Lauderdale", "33324": "Fort Lauderdale",
  "33325": "Fort Lauderdale", "33326": "Fort Lauderdale", "33327": "Fort Lauderdale",
  "33328": "Fort Lauderdale", "33329": "Fort Lauderdale", "33330": "Fort Lauderdale",
  "33331": "Fort Lauderdale", "33332": "Fort Lauderdale", "33334": "Fort Lauderdale",
  "33335": "Fort Lauderdale", "33336": "Fort Lauderdale", "33337": "Fort Lauderdale",
  "33338": "Fort Lauderdale", "33339": "Fort Lauderdale", "33340": "Fort Lauderdale",
  "33345": "Fort Lauderdale", "33346": "Fort Lauderdale", "33348": "Fort Lauderdale",
  "33349": "Fort Lauderdale", "33351": "Fort Lauderdale", "33355": "Fort Lauderdale",
  "33359": "Fort Lauderdale", "33388": "Fort Lauderdale", "33394": "Fort Lauderdale",

  // Orlando area
  "32801": "Orlando", "32802": "Orlando", "32803": "Orlando", "32804": "Orlando",
  "32805": "Orlando", "32806": "Orlando", "32807": "Orlando", "32808": "Orlando",
  "32809": "Orlando", "32810": "Orlando", "32811": "Orlando", "32812": "Orlando",
  "32814": "Orlando", "32815": "Orlando", "32816": "Orlando", "32817": "Orlando",
  "32818": "Orlando", "32819": "Orlando", "32820": "Orlando", "32821": "Orlando",
  "32822": "Orlando", "32824": "Orlando", "32825": "Orlando", "32826": "Orlando",
  "32827": "Orlando", "32828": "Orlando", "32829": "Orlando", "32830": "Orlando",
  "32831": "Orlando", "32832": "Orlando", "32833": "Orlando", "32834": "Orlando",
  "32835": "Orlando", "32836": "Orlando", "32837": "Orlando", "32839": "Orlando",
  "32853": "Orlando", "32854": "Orlando", "32855": "Orlando", "32856": "Orlando",
  "32857": "Orlando", "32858": "Orlando", "32859": "Orlando", "32860": "Orlando",
  "32861": "Orlando", "32862": "Orlando", "32867": "Orlando", "32868": "Orlando",
  "32869": "Orlando", "32872": "Orlando", "32877": "Orlando", "32878": "Orlando",
  "32885": "Orlando", "32886": "Orlando", "32887": "Orlando", "32891": "Orlando",
  "32893": "Orlando", "32896": "Orlando", "32897": "Orlando", "32898": "Orlando",

  // Tampa area
  "33601": "Tampa", "33602": "Tampa", "33603": "Tampa", "33604": "Tampa",
  "33605": "Tampa", "33606": "Tampa", "33607": "Tampa", "33608": "Tampa",
  "33609": "Tampa", "33610": "Tampa", "33611": "Tampa", "33612": "Tampa",
  "33613": "Tampa", "33614": "Tampa", "33615": "Tampa", "33616": "Tampa",
  "33617": "Tampa", "33618": "Tampa", "33619": "Tampa", "33620": "Tampa",
  "33621": "Tampa", "33622": "Tampa", "33623": "Tampa", "33624": "Tampa",
  "33625": "Tampa", "33626": "Tampa", "33629": "Tampa", "33630": "Tampa",
  "33631": "Tampa", "33633": "Tampa", "33634": "Tampa", "33635": "Tampa",
  "33637": "Tampa", "33647": "Tampa", "33672": "Tampa", "33673": "Tampa",
  "33674": "Tampa", "33675": "Tampa", "33677": "Tampa", "33679": "Tampa",
  "33680": "Tampa", "33681": "Tampa", "33682": "Tampa", "33684": "Tampa",
  "33685": "Tampa", "33686": "Tampa", "33687": "Tampa", "33688": "Tampa",
  "33689": "Tampa", "33694": "Tampa", "33697": "Tampa", "33698": "Tampa",

  // Jacksonville area
  "32099": "Jacksonville", "32201": "Jacksonville", "32202": "Jacksonville", "32203": "Jacksonville",
  "32204": "Jacksonville", "32205": "Jacksonville", "32206": "Jacksonville", "32207": "Jacksonville",
  "32208": "Jacksonville", "32209": "Jacksonville", "32210": "Jacksonville", "32211": "Jacksonville",
  "32212": "Jacksonville", "32214": "Jacksonville", "32216": "Jacksonville", "32217": "Jacksonville",
  "32218": "Jacksonville", "32219": "Jacksonville", "32220": "Jacksonville", "32221": "Jacksonville",
  "32222": "Jacksonville", "32223": "Jacksonville", "32224": "Jacksonville", "32225": "Jacksonville",
  "32226": "Jacksonville", "32227": "Jacksonville", "32228": "Jacksonville", "32229": "Jacksonville",
  "32231": "Jacksonville", "32232": "Jacksonville", "32233": "Jacksonville", "32234": "Jacksonville",
  "32235": "Jacksonville", "32236": "Jacksonville", "32238": "Jacksonville", "32239": "Jacksonville",
  "32241": "Jacksonville", "32244": "Jacksonville", "32245": "Jacksonville", "32246": "Jacksonville",
  "32247": "Jacksonville", "32250": "Jacksonville", "32254": "Jacksonville", "32255": "Jacksonville",
  "32256": "Jacksonville", "32257": "Jacksonville", "32258": "Jacksonville", "32259": "Jacksonville",
  "32260": "Jacksonville", "32266": "Jacksonville", "32267": "Jacksonville", "32277": "Jacksonville",

  // St. Petersburg area
  "33701": "St. Petersburg", "33702": "St. Petersburg", "33703": "St. Petersburg", "33704": "St. Petersburg",
  "33705": "St. Petersburg", "33706": "St. Petersburg", "33707": "St. Petersburg", "33708": "St. Petersburg",
  "33709": "St. Petersburg", "33710": "St. Petersburg", "33711": "St. Petersburg", "33712": "St. Petersburg",
  "33713": "St. Petersburg", "33714": "St. Petersburg", "33715": "St. Petersburg", "33716": "St. Petersburg",
  "33730": "St. Petersburg", "33731": "St. Petersburg", "33732": "St. Petersburg", "33733": "St. Petersburg",
  "33734": "St. Petersburg", "33736": "St. Petersburg", "33740": "St. Petersburg", "33741": "St. Petersburg",
  "33742": "St. Petersburg", "33743": "St. Petersburg", "33747": "St. Petersburg", "33755": "St. Petersburg",
  "33756": "St. Petersburg", "33757": "St. Petersburg", "33758": "St. Petersburg", "33759": "St. Petersburg",
  "33760": "St. Petersburg", "33761": "St. Petersburg", "33762": "St. Petersburg", "33763": "St. Petersburg",
  "33764": "St. Petersburg", "33765": "St. Petersburg", "33767": "St. Petersburg", "33770": "St. Petersburg",
  "33771": "St. Petersburg", "33772": "St. Petersburg", "33773": "St. Petersburg", "33774": "St. Petersburg",
  "33776": "St. Petersburg", "33777": "St. Petersburg", "33778": "St. Petersburg", "33781": "St. Petersburg",
  "33782": "St. Petersburg", "33785": "St. Petersburg", "33786": "St. Petersburg",

  // West Palm Beach area
  "33401": "West Palm Beach", "33402": "West Palm Beach", "33403": "West Palm Beach", "33404": "West Palm Beach",
  "33405": "West Palm Beach", "33406": "West Palm Beach", "33407": "West Palm Beach", "33408": "West Palm Beach",
  "33409": "West Palm Beach", "33410": "West Palm Beach", "33411": "West Palm Beach", "33412": "West Palm Beach",
  "33413": "West Palm Beach", "33414": "West Palm Beach", "33415": "West Palm Beach", "33416": "West Palm Beach",
  "33417": "West Palm Beach", "33418": "West Palm Beach", "33426": "West Palm Beach", "33480": "West Palm Beach",
  "33481": "West Palm Beach", "33482": "West Palm Beach", "33483": "West Palm Beach", "33484": "West Palm Beach",
  "33486": "West Palm Beach", "33487": "West Palm Beach",

  // Tallahassee area
  "32301": "Tallahassee", "32302": "Tallahassee", "32303": "Tallahassee", "32304": "Tallahassee",
  "32305": "Tallahassee", "32306": "Tallahassee", "32307": "Tallahassee", "32308": "Tallahassee",
  "32309": "Tallahassee", "32310": "Tallahassee", "32311": "Tallahassee", "32312": "Tallahassee",
  "32313": "Tallahassee", "32314": "Tallahassee", "32315": "Tallahassee", "32316": "Tallahassee",
  "32317": "Tallahassee", "32318": "Tallahassee", "32395": "Tallahassee", "32399": "Tallahassee",

  // Gainesville area
  "32601": "Gainesville", "32602": "Gainesville", "32603": "Gainesville", "32604": "Gainesville",
  "32605": "Gainesville", "32606": "Gainesville", "32607": "Gainesville", "32608": "Gainesville",
  "32609": "Gainesville", "32610": "Gainesville", "32611": "Gainesville", "32612": "Gainesville",
  "32613": "Gainesville", "32614": "Gainesville", "32615": "Gainesville", "32616": "Gainesville",
  "32627": "Gainesville", "32635": "Gainesville", "32641": "Gainesville", "32653": "Gainesville",

  // Clearwater area
  "33755": "Clearwater", "33756": "Clearwater", "33759": "Clearwater", "33760": "Clearwater",
  "33761": "Clearwater", "33762": "Clearwater", "33763": "Clearwater", "33764": "Clearwater",
  "33765": "Clearwater", "33767": "Clearwater", "33770": "Clearwater", "33771": "Clearwater",
  "33772": "Clearwater", "33773": "Clearwater", "33774": "Clearwater", "33776": "Clearwater",
  "33777": "Clearwater", "33778": "Clearwater", "33781": "Clearwater", "33782": "Clearwater",
  "33785": "Clearwater", "33786": "Clearwater",
};

// ... keep existing code (mockHeatData object and chartConfig)
const mockHeatData: Record<string, HeatData[]> = {
  "Miami": [
    { date: "Jan", temperature: 76, heatIndex: 78, acUsage: 65, city: "Miami" },
    { date: "Feb", temperature: 78, heatIndex: 80, acUsage: 70, city: "Miami" },
    { date: "Mar", temperature: 82, heatIndex: 85, acUsage: 75, city: "Miami" },
    { date: "Apr", temperature: 85, heatIndex: 89, acUsage: 80, city: "Miami" },
    { date: "May", temperature: 88, heatIndex: 94, acUsage: 85, city: "Miami" },
    { date: "Jun", temperature: 91, heatIndex: 98, acUsage: 95, city: "Miami" },
    { date: "Jul", temperature: 93, heatIndex: 105, acUsage: 100, city: "Miami" },
    { date: "Aug", temperature: 93, heatIndex: 106, acUsage: 100, city: "Miami" },
    { date: "Sep", temperature: 91, heatIndex: 98, acUsage: 90, city: "Miami" },
    { date: "Oct", temperature: 87, heatIndex: 91, acUsage: 80, city: "Miami" },
    { date: "Nov", temperature: 82, heatIndex: 84, acUsage: 70, city: "Miami" },
    { date: "Dec", temperature: 78, heatIndex: 80, acUsage: 65, city: "Miami" },
  ],
  "Orlando": [
    { date: "Jan", temperature: 72, heatIndex: 74, acUsage: 55, city: "Orlando" },
    { date: "Feb", temperature: 75, heatIndex: 77, acUsage: 60, city: "Orlando" },
    { date: "Mar", temperature: 80, heatIndex: 82, acUsage: 70, city: "Orlando" },
    { date: "Apr", temperature: 84, heatIndex: 87, acUsage: 75, city: "Orlando" },
    { date: "May", temperature: 89, heatIndex: 95, acUsage: 85, city: "Orlando" },
    { date: "Jun", temperature: 92, heatIndex: 100, acUsage: 95, city: "Orlando" },
    { date: "Jul", temperature: 94, heatIndex: 108, acUsage: 100, city: "Orlando" },
    { date: "Aug", temperature: 94, heatIndex: 107, acUsage: 100, city: "Orlando" },
    { date: "Sep", temperature: 91, heatIndex: 97, acUsage: 88, city: "Orlando" },
    { date: "Oct", temperature: 86, heatIndex: 89, acUsage: 75, city: "Orlando" },
    { date: "Nov", temperature: 80, heatIndex: 82, acUsage: 65, city: "Orlando" },
    { date: "Dec", temperature: 74, heatIndex: 76, acUsage: 55, city: "Orlando" },
  ],
  "Tampa": [
    { date: "Jan", temperature: 71, heatIndex: 73, acUsage: 50, city: "Tampa" },
    { date: "Feb", temperature: 74, heatIndex: 76, acUsage: 55, city: "Tampa" },
    { date: "Mar", temperature: 79, heatIndex: 81, acUsage: 65, city: "Tampa" },
    { date: "Apr", temperature: 83, heatIndex: 86, acUsage: 72, city: "Tampa" },
    { date: "May", temperature: 88, heatIndex: 93, acUsage: 82, city: "Tampa" },
    { date: "Jun", temperature: 91, heatIndex: 98, acUsage: 92, city: "Tampa" },
    { date: "Jul", temperature: 92, heatIndex: 103, acUsage: 98, city: "Tampa" },
    { date: "Aug", temperature: 92, heatIndex: 104, acUsage: 98, city: "Tampa" },
    { date: "Sep", temperature: 90, heatIndex: 96, acUsage: 85, city: "Tampa" },
    { date: "Oct", temperature: 85, heatIndex: 88, acUsage: 72, city: "Tampa" },
    { date: "Nov", temperature: 79, heatIndex: 81, acUsage: 60, city: "Tampa" },
    { date: "Dec", temperature: 73, heatIndex: 75, acUsage: 50, city: "Tampa" },
  ],
  "Jacksonville": [
    { date: "Jan", temperature: 65, heatIndex: 67, acUsage: 40, city: "Jacksonville" },
    { date: "Feb", temperature: 68, heatIndex: 70, acUsage: 45, city: "Jacksonville" },
    { date: "Mar", temperature: 74, heatIndex: 76, acUsage: 55, city: "Jacksonville" },
    { date: "Apr", temperature: 79, heatIndex: 82, acUsage: 65, city: "Jacksonville" },
    { date: "May", temperature: 85, heatIndex: 90, acUsage: 78, city: "Jacksonville" },
    { date: "Jun", temperature: 89, heatIndex: 96, acUsage: 88, city: "Jacksonville" },
    { date: "Jul", temperature: 91, heatIndex: 102, acUsage: 95, city: "Jacksonville" },
    { date: "Aug", temperature: 90, heatIndex: 101, acUsage: 94, city: "Jacksonville" },
    { date: "Sep", temperature: 87, heatIndex: 92, acUsage: 82, city: "Jacksonville" },
    { date: "Oct", temperature: 81, heatIndex: 84, acUsage: 68, city: "Jacksonville" },
    { date: "Nov", temperature: 74, heatIndex: 76, acUsage: 55, city: "Jacksonville" },
    { date: "Dec", temperature: 67, heatIndex: 69, acUsage: 42, city: "Jacksonville" },
  ],
  "Fort Lauderdale": [
    { date: "Jan", temperature: 75, heatIndex: 77, acUsage: 62, city: "Fort Lauderdale" },
    { date: "Feb", temperature: 77, heatIndex: 79, acUsage: 67, city: "Fort Lauderdale" },
    { date: "Mar", temperature: 81, heatIndex: 84, acUsage: 73, city: "Fort Lauderdale" },
    { date: "Apr", temperature: 84, heatIndex: 88, acUsage: 78, city: "Fort Lauderdale" },
    { date: "May", temperature: 87, heatIndex: 93, acUsage: 83, city: "Fort Lauderdale" },
    { date: "Jun", temperature: 90, heatIndex: 97, acUsage: 93, city: "Fort Lauderdale" },
    { date: "Jul", temperature: 92, heatIndex: 104, acUsage: 98, city: "Fort Lauderdale" },
    { date: "Aug", temperature: 92, heatIndex: 105, acUsage: 98, city: "Fort Lauderdale" },
    { date: "Sep", temperature: 90, heatIndex: 97, acUsage: 88, city: "Fort Lauderdale" },
    { date: "Oct", temperature: 86, heatIndex: 90, acUsage: 78, city: "Fort Lauderdale" },
    { date: "Nov", temperature: 81, heatIndex: 83, acUsage: 68, city: "Fort Lauderdale" },
    { date: "Dec", temperature: 77, heatIndex: 79, acUsage: 62, city: "Fort Lauderdale" },
  ],
  "St. Petersburg": [
    { date: "Jan", temperature: 70, heatIndex: 72, acUsage: 48, city: "St. Petersburg" },
    { date: "Feb", temperature: 73, heatIndex: 75, acUsage: 53, city: "St. Petersburg" },
    { date: "Mar", temperature: 78, heatIndex: 80, acUsage: 63, city: "St. Petersburg" },
    { date: "Apr", temperature: 82, heatIndex: 85, acUsage: 70, city: "St. Petersburg" },
    { date: "May", temperature: 87, heatIndex: 92, acUsage: 80, city: "St. Petersburg" },
    { date: "Jun", temperature: 90, heatIndex: 97, acUsage: 90, city: "St. Petersburg" },
    { date: "Jul", temperature: 91, heatIndex: 102, acUsage: 96, city: "St. Petersburg" },
    { date: "Aug", temperature: 91, heatIndex: 103, acUsage: 96, city: "St. Petersburg" },
    { date: "Sep", temperature: 89, heatIndex: 95, acUsage: 83, city: "St. Petersburg" },
    { date: "Oct", temperature: 84, heatIndex: 87, acUsage: 70, city: "St. Petersburg" },
    { date: "Nov", temperature: 78, heatIndex: 80, acUsage: 58, city: "St. Petersburg" },
    { date: "Dec", temperature: 72, heatIndex: 74, acUsage: 48, city: "St. Petersburg" },
  ],
  "Tallahassee": [
    { date: "Jan", temperature: 62, heatIndex: 64, acUsage: 35, city: "Tallahassee" },
    { date: "Feb", temperature: 66, heatIndex: 68, acUsage: 40, city: "Tallahassee" },
    { date: "Mar", temperature: 72, heatIndex: 74, acUsage: 50, city: "Tallahassee" },
    { date: "Apr", temperature: 77, heatIndex: 80, acUsage: 60, city: "Tallahassee" },
    { date: "May", temperature: 84, heatIndex: 89, acUsage: 75, city: "Tallahassee" },
    { date: "Jun", temperature: 88, heatIndex: 95, acUsage: 85, city: "Tallahassee" },
    { date: "Jul", temperature: 90, heatIndex: 100, acUsage: 92, city: "Tallahassee" },
    { date: "Aug", temperature: 89, heatIndex: 99, acUsage: 90, city: "Tallahassee" },
    { date: "Sep", temperature: 86, heatIndex: 91, acUsage: 78, city: "Tallahassee" },
    { date: "Oct", temperature: 79, heatIndex: 82, acUsage: 62, city: "Tallahassee" },
    { date: "Nov", temperature: 71, heatIndex: 73, acUsage: 45, city: "Tallahassee" },
    { date: "Dec", temperature: 64, heatIndex: 66, acUsage: 35, city: "Tallahassee" },
  ],
  "Gainesville": [
    { date: "Jan", temperature: 66, heatIndex: 68, acUsage: 42, city: "Gainesville" },
    { date: "Feb", temperature: 70, heatIndex: 72, acUsage: 47, city: "Gainesville" },
    { date: "Mar", temperature: 75, heatIndex: 77, acUsage: 57, city: "Gainesville" },
    { date: "Apr", temperature: 80, heatIndex: 83, acUsage: 67, city: "Gainesville" },
    { date: "May", temperature: 86, heatIndex: 91, acUsage: 80, city: "Gainesville" },
    { date: "Jun", temperature: 90, heatIndex: 98, acUsage: 90, city: "Gainesville" },
    { date: "Jul", temperature: 92, heatIndex: 104, acUsage: 96, city: "Gainesville" },
    { date: "Aug", temperature: 91, heatIndex: 103, acUsage: 95, city: "Gainesville" },
    { date: "Sep", temperature: 88, heatIndex: 94, acUsage: 82, city: "Gainesville" },
    { date: "Oct", temperature: 82, heatIndex: 85, acUsage: 68, city: "Gainesville" },
    { date: "Nov", temperature: 75, heatIndex: 77, acUsage: 52, city: "Gainesville" },
    { date: "Dec", temperature: 68, heatIndex: 70, acUsage: 42, city: "Gainesville" },
  ],
  "West Palm Beach": [
    { date: "Jan", temperature: 74, heatIndex: 76, acUsage: 60, city: "West Palm Beach" },
    { date: "Feb", temperature: 76, heatIndex: 78, acUsage: 65, city: "West Palm Beach" },
    { date: "Mar", temperature: 80, heatIndex: 83, acUsage: 71, city: "West Palm Beach" },
    { date: "Apr", temperature: 83, heatIndex: 87, acUsage: 76, city: "West Palm Beach" },
    { date: "May", temperature: 86, heatIndex: 92, acUsage: 81, city: "West Palm Beach" },
    { date: "Jun", temperature: 89, heatIndex: 96, acUsage: 91, city: "West Palm Beach" },
    { date: "Jul", temperature: 91, heatIndex: 103, acUsage: 96, city: "West Palm Beach" },
    { date: "Aug", temperature: 91, heatIndex: 104, acUsage: 96, city: "West Palm Beach" },
    { date: "Sep", temperature: 89, heatIndex: 96, acUsage: 86, city: "West Palm Beach" },
    { date: "Oct", temperature: 85, heatIndex: 89, acUsage: 76, city: "West Palm Beach" },
    { date: "Nov", temperature: 80, heatIndex: 82, acUsage: 66, city: "West Palm Beach" },
    { date: "Dec", temperature: 76, heatIndex: 78, acUsage: 60, city: "West Palm Beach" },
  ],
  "Clearwater": [
    { date: "Jan", temperature: 69, heatIndex: 71, acUsage: 46, city: "Clearwater" },
    { date: "Feb", temperature: 72, heatIndex: 74, acUsage: 51, city: "Clearwater" },
    { date: "Mar", temperature: 77, heatIndex: 79, acUsage: 61, city: "Clearwater" },
    { date: "Apr", temperature: 81, heatIndex: 84, acUsage: 68, city: "Clearwater" },
    { date: "May", temperature: 86, heatIndex: 91, acUsage: 78, city: "Clearwater" },
    { date: "Jun", temperature: 89, heatIndex: 96, acUsage: 88, city: "Clearwater" },
    { date: "Jul", temperature: 90, heatIndex: 101, acUsage: 94, city: "Clearwater" },
    { date: "Aug", temperature: 90, heatIndex: 102, acUsage: 94, city: "Clearwater" },
    { date: "Sep", temperature: 88, heatIndex: 94, acUsage: 81, city: "Clearwater" },
    { date: "Oct", temperature: 83, heatIndex: 86, acUsage: 68, city: "Clearwater" },
    { date: "Nov", temperature: 77, heatIndex: 79, acUsage: 56, city: "Clearwater" },
    { date: "Dec", temperature: 71, heatIndex: 73, acUsage: 46, city: "Clearwater" },
  ]
};

const chartConfig = {
  temperature: {
    label: "Temperature",
    color: "hsl(var(--chart-1))",
  },
  heatIndex: {
    label: "Heat Index",
    color: "hsl(var(--chart-2))",
  },
  acUsage: {
    label: "AC Usage %",
    color: "hsl(var(--chart-3))",
  },
};

const HeatIndexVisualization = () => {
  const [selectedCity, setSelectedCity] = useState("Miami");
  const [searchCity, setSearchCity] = useState("");
  const [currentData, setCurrentData] = useState<HeatData[]>(mockHeatData.Miami);

  useEffect(() => {
    setCurrentData(mockHeatData[selectedCity] || mockHeatData.Miami);
  }, [selectedCity]);

  const handleCitySearch = () => {
    if (!searchCity.trim()) return;
    
    const searchTerm = searchCity.toLowerCase().trim();
    
    // Check if it's a zip code
    const cityFromZip = floridaZipCodes[searchTerm];
    if (cityFromZip) {
      setSelectedCity(cityFromZip);
      setSearchCity(""); // Clear search after successful search
      return;
    }
    
    // Check if it's a city name
    const cityKey = Object.keys(mockHeatData).find(
      city => city.toLowerCase().includes(searchTerm)
    );
    
    if (cityKey) {
      setSelectedCity(cityKey);
      setSearchCity(""); // Clear search after successful search
    } else {
      // Show alert with available options
      const availableCities = Object.keys(mockHeatData).join(", ");
      const sampleZips = Object.keys(floridaZipCodes).slice(0, 10).join(", ");
      alert(`"${searchCity}" not found. Try:\nCities: ${availableCities}\nOr any Florida zip code (e.g., ${sampleZips}...)`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCitySearch();
    }
  };

  const getCurrentMonthData = () => {
    const currentMonth = new Date().getMonth();
    return currentData[currentMonth] || currentData[0];
  };

  const currentMonth = getCurrentMonthData();
  const getHeatLevel = (heatIndex: number) => {
    if (heatIndex >= 105) return { level: "Extreme", color: "bg-red-600", textColor: "text-red-600" };
    if (heatIndex >= 90) return { level: "High", color: "bg-orange-500", textColor: "text-orange-600" };
    if (heatIndex >= 80) return { level: "Moderate", color: "bg-yellow-500", textColor: "text-yellow-600" };
    return { level: "Low", color: "bg-green-500", textColor: "text-green-600" };
  };

  const heatLevel = getHeatLevel(currentMonth.heatIndex);

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-orange-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Florida Heat Index & AC Usage Monitor
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Track real-time heat index data and AC usage patterns in your area to optimize cooling costs and maintenance schedules.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* City Search and Selection */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex items-center space-x-2 flex-1">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <Input
                    placeholder="Search by Florida city or zip code (e.g., Miami, 33139)..."
                    value={searchCity}
                    onChange={(e) => setSearchCity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleCitySearch} className="bg-blue-600 hover:bg-blue-700">
                    Search
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">Or select:</span>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(mockHeatData).sort().map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <Thermometer className="w-4 h-4 mr-2" />
                  Current Temp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonth.temperature}°F</div>
                <p className="text-xs text-gray-600">in {selectedCity}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <ThermometerSun className="w-4 h-4 mr-2" />
                  Heat Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonth.heatIndex}°F</div>
                <Badge className={`${heatLevel.color} text-white mt-1`}>
                  {heatLevel.level}
                </Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  AC Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentMonth.acUsage}%</div>
                <p className="text-xs text-gray-600">vs typical usage</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Efficiency Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-600 font-medium">
                  {currentMonth.heatIndex > 100 
                    ? "Schedule maintenance now"
                    : currentMonth.heatIndex > 90 
                    ? "Check air filters"
                    : "Optimal conditions"
                  }
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Annual Heat Index Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="heatIndex"
                        stroke="var(--color-heatIndex)"
                        fill="var(--color-heatIndex)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="temperature"
                        stroke="var(--color-temperature)"
                        fill="var(--color-temperature)"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AC Usage Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={currentData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="acUsage"
                        stroke="var(--color-acUsage)"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Insights */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Smart Recommendations for {selectedCity}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Maintenance Alert</h4>
                  <p className="text-sm text-blue-800">
                    {currentMonth.heatIndex > 100 
                      ? "High heat stress detected. Schedule AC maintenance within 7 days."
                      : "Your AC is operating in normal conditions."
                    }
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Energy Savings</h4>
                  <p className="text-sm text-green-800">
                    Optimal thermostat setting: {currentMonth.heatIndex > 95 ? "76-78°F" : "78-80°F"} 
                    to balance comfort and efficiency.
                  </p>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-2">Peak Usage</h4>
                  <p className="text-sm text-orange-800">
                    Expected peak AC usage: {Math.max(...currentData.map(d => d.acUsage))}% 
                    during {currentData.find(d => d.acUsage === Math.max(...currentData.map(d => d.acUsage)))?.date}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default HeatIndexVisualization;
