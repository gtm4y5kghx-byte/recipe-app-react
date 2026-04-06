export interface AppError {
    title: string;
    message: string;
    suggestion?: string;
}

export class RecipeError extends Error implements AppError {
    title: string;
    suggestion?: string;

    private constructor(title: string, message: string, suggestion?: string) {
        super(message);
        this.name = "RecipeError";
        this.title = title;
        this.suggestion = suggestion;
    }

    static saveFailed(): RecipeError {
        return new RecipeError(
            "Save Failed",
            "We couldn't save your recipe. Please try again.",
            "Check that all required fields are filled out.",
        );
    }

    static deleteFailed(): RecipeError {
        return new RecipeError(
            "Delete Failed",
            "We couldn't delete this recipe. Please try again.",
            "Make sure the recipe isn't currently being edited.",
        );
    }

    static importFailed(reason: string): RecipeError {
        return new RecipeError(
            "Import Failed",
            `We couldn't import this recipe. ${reason}`,
            "Try copying the recipe details manually or check if the URL is correct.",
        );
    }

    static invalidData(): RecipeError {
        return new RecipeError(
            "Invalid Recipe Data",
            "The recipe data is incomplete or invalid.",
            "Ensure the recipe has a title and at least one ingredient or instruction.",
        );
    }
}

export class SearchError extends Error implements AppError {
    title: string;
    suggestion?: string;

    private constructor(title: string, message: string, suggestion?: string) {
        super(message);
        this.name = "SearchError";
        this.title = title;
        this.suggestion = suggestion;
    }

    static noResults(): SearchError {
        return new SearchError(
            "No Results",
            "We couldn't find any recipes matching your search.",
            "Try different keywords or browse all recipes.",
        );
    }

    static searchFailed(): SearchError {
        return new SearchError(
            "Search Failed",
            "Something went wrong while searching. Please try again.",
            "Check your connection and try again.",
        );
    }

    static outOfScope(details: string): SearchError {
        return new SearchError(
            "Out of Scope",
            details,
            "This service only handles recipe and cooking-related questions.",
        );
    }
}

export class AIError extends Error implements AppError {
    title: string;
    suggestion?: string;

    private constructor(title: string, message: string, suggestion?: string) {
        super(message);
        this.name = "AIError";
        this.title = title;
        this.suggestion = suggestion;
    }

    static suggestionsFailed(): AIError {
        return new AIError(
            "Suggestions Unavailable",
            "We couldn't generate recipe suggestions at this time.",
            "Try again later or browse your recipes manually.",
        );
    }

    static generationFailed(): AIError {
        return new AIError(
            "Generation Failed",
            "We couldn't generate new recipes at this time.",
            "Try again later. Your recipe collection helps us personalize suggestions.",
        );
    }

    static apiError(details: string): AIError {
        return new AIError(
            "AI Error",
            `AI service error: ${details}`,
            "Please try again. If the problem persists, contact support.",
        );
    }

    static networkError(): AIError {
        return new AIError(
            "Network Error",
            "Unable to connect to AI service. Check your internet connection.",
            "Check your internet connection and try again.",
        );
    }

    static premiumRequired(): AIError {
        return new AIError(
            "Premium Feature",
            "AI-powered features require a premium subscription.",
            "Upgrade to premium to unlock AI features.",
        );
    }

    static emptyCollection(): AIError {
        return new AIError(
            "No Recipes",
            "You don't have any recipes yet.",
            "Import or create some recipes to use this feature.",
        );
    }

    static insufficientRecipes(available: number, required: number): AIError {
        return new AIError(
            "Not Enough Recipes",
            `You have ${available} recipes, but need at least ${required} for this feature.`,
            "Add more recipes to your collection for better results.",
        );
    }

    static parsingFailed(): AIError {
        return new AIError(
            "Processing Failed",
            "We couldn't process the AI response.",
            "Please try again. If the problem persists, contact support.",
        );
    }

    static weeklyLimitReached(): AIError {
        return new AIError(
            "Weekly Limit Reached",
            "You've used all 3 meal plan generations for this week.",
            "Create a plan manually or wait for your limit to reset.",
        );
    }
}

export class ImportError extends Error implements AppError {
    title: string;
    suggestion?: string;

    private constructor(title: string, message: string, suggestion?: string) {
        super(message);
        this.name = "ImportError";
        this.title = title;
        this.suggestion = suggestion;
    }

    static unsupportedWebsite(): ImportError {
        return new ImportError(
            "Unsupported Website",
            "This website is not supported for automatic recipe import.",
            "Try copying the recipe details manually.",
        );
    }

    static parsingFailed(): ImportError {
        return new ImportError(
            "Import Failed",
            "We couldn't extract recipe data from this page.",
            "The recipe format may not be compatible. Try adding it manually.",
        );
    }

    static networkTimeout(): ImportError {
        return new ImportError(
            "Connection Timeout",
            "The request took too long to complete.",
            "Check your internet connection and try again.",
        );
    }

    static invalidURL(): ImportError {
        return new ImportError(
            "Invalid URL",
            "The URL you entered is not valid.",
            "Please enter a valid URL starting with http:// or https://",
        );
    }
}

export class MealPlanError extends Error implements AppError {
    title: string;
    suggestion?: string;

    private constructor(title: string, message: string, suggestion?: string) {
        super(message);
        this.name = "MealPlanError";
        this.title = title;
        this.suggestion = suggestion;
    }

    static saveFailed(): MealPlanError {
        return new MealPlanError(
            "Save Failed",
            "We couldn't save this meal plan entry.",
            "Please try again.",
        );
    }

    static deleteFailed(): MealPlanError {
        return new MealPlanError(
            "Delete Failed",
            "We couldn't remove this meal plan entry.",
            "Please try again.",
        );
    }

    static loadFailed(): MealPlanError {
        return new MealPlanError(
            "Load Failed",
            "We couldn't load your meal plan.",
            "Please try again.",
        );
    }
}

export class GenericError extends Error implements AppError {
    title: string;
    suggestion?: string;

    private constructor(title: string, message: string, suggestion?: string) {
        super(message);
        this.name = "GenericError";
        this.title = title;
        this.suggestion = suggestion;
    }

    static unknown(): GenericError {
        return new GenericError(
            "Something Went Wrong",
            "An unexpected error occurred.",
            "Please try again.",
        );
    }
}

export function toAppError(error: unknown): AppError {
    if (error instanceof Error && "title" in error) {
        return error as AppError;
    }
    return GenericError.unknown();
}
