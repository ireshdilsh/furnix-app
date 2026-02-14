/**
 * Funix Furniture App - Entry Point
 * Redirects to main tabs navigation
 */

import { Redirect } from 'expo-router';

export default function Index() {
    // Redirect to the main tabs - the tabs layout will handle showing the home screen
    // @ts-expect-error - expo-router types don't include dynamicky generated routes
    return <Redirect href="/(tabs)" />;
}