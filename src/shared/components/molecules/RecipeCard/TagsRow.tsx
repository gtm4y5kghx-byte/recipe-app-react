import { View } from "react-native";
import { DSTag } from "@/shared/components/atoms/DSTag";
import { DSLabel } from "@/shared/components/atoms/DSLabel";

type TagRowProps = {
  tags: string[];
};

const MAX_VISIBLE_TAGS = 2;

export const TagsRow = ({ tags }: TagRowProps) => {
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const overflowCount = tags.length - MAX_VISIBLE_TAGS;

  return (
    <>
      {visibleTags.length > 0 && (
        <View className="flex-row items-center gap-xs">
          {visibleTags.map((tag) => (
            <DSTag key={tag} text={tag} style="secondary" size="small" />
          ))}
          {overflowCount > 0 && (
            <DSLabel
              text={`+${overflowCount}`}
              style="caption2"
              color="secondary"
            />
          )}
        </View>
      )}
    </>
  );
};
