import CardSquare from "@/components/card-square";
import { Image, ScrollView, Text, View } from "react-native";

export default function CreatedElectionsScreen(){
    return(
    <ScrollView>
        <View className="flex flex-col p-7 gap-8">
            <View className="w-full border rounded-xl">
                <Image className="w-full image-cover rounded-xl" source={require('../../../assets/images/Jumbotron.png')}/>
            </View>
            <View>
                <Text className="text-3xl font-bold">Created Elections</Text>
            </View>
            <View className="flex gap-3">
                <CardSquare></CardSquare>
                <CardSquare></CardSquare>
            </View>
        </View>
    </ScrollView>
    );
}