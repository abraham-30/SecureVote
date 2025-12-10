import CardRectangular from "@/components/card-rectangular";
import { ScrollView, Text, View } from "react-native";

export default function HistoryScreen(){
        return(
        <ScrollView>
            <View className="flex flex-col p-7 gap-8">
                <View>
                    <Text className="text-3xl font-bold">History</Text>
                </View>
                <View className="flex flex-col gap-3">
                    <CardRectangular></CardRectangular>
                    <CardRectangular></CardRectangular>
                </View>
            </View>
        </ScrollView>
    );
}