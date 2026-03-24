import { View } from "react-native";
import { DSIcon } from "@/shared/components/atoms/DSIcon";
import { DSLabel } from "@/shared/components/atoms/DSLabel";
import { DSButton } from "@/shared/components/atoms/DSButton";

type DSEmptyStateProps = {
  icon: string;
  title: string;
  message: string;
  actionTitle?: string;
  onAction?: () => void;
};

export const DSEmptyState = ({
  icon,
  title,
  message,
  actionTitle,
  onAction,
}: DSEmptyStateProps) => {
  return (
    <View className="items-center justify-center px-xl py-2xl">
      <View className="items-center justify-center rounded-full bg-background-dark p-lg mb-md">
        <DSIcon name={icon} size="xlarge" color="tertiary" />
      </View>
      <DSLabel text={title} style="title3" color="primary" alignment="center" />
      <View className="mt-xs mb-md">
        <DSLabel
          text={message}
          style="body"
          color="secondary"
          alignment="center"
        />
      </View>
      {actionTitle && onAction && (
        <DSButton
          title={actionTitle}
          style="primary"
          size="medium"
          fullWidth={false}
          onPress={onAction}
        />
      )}
    </View>
  );
};
