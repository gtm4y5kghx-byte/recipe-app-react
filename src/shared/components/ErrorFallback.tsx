import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSButton } from "@/shared/components/atoms/DSButton";
import { DSIcon } from "@/shared/components/atoms/DSIcon";

type ErrorFallbackProps = {
    error: Error | null;
    onReset: () => void;
};

export const ErrorFallback = ({ error, onReset }: ErrorFallbackProps) => {
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 justify-center items-center gap-sm">
                <DSIcon name="alert-circle-outline" size="large" color="error" />
                <DSLabel text="Something went wrong" style="title3" alignment="center" />
                <DSLabel
                    text={error?.message ?? "An unexpected error occurred"}
                    style="body"
                    color="secondary"
                    alignment="center"
                />
                <DSButton size="small" title="Try Again" style="secondary" onPress={onReset} fullWidth={false} />
            </View>
        </SafeAreaView>
    );
};
