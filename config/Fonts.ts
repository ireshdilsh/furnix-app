/**
 * Funix Furniture App - Font Configuration
 * Modern Gen Z Typography with Poppins
 */

import {
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export const Fonts = {
    // Poppins Font Family - Primary (from Google Fonts)
    'Poppins-Light': Poppins_300Light,
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,

    // Legacy fonts (keeping for compatibility)
    'Josefin': require('../fonts/josefin/static/JosefinSans-Medium.ttf'),
    'Josefin-Bold': require('../fonts/josefin/static/JosefinSans-Bold.ttf'),
    'Pacifico': require('../fonts/pacifico/Pacifico-Regular.ttf'),
};

// Font family names for use in styles
export const FontFamily = {
    light: 'Poppins-Light',
    regular: 'Poppins-Regular',
    medium: 'Poppins-Medium',
    semiBold: 'Poppins-SemiBold',
    bold: 'Poppins-Bold',
    // Legacy
    josefin: 'Josefin',
    josefinBold: 'Josefin-Bold',
    pacifico: 'Pacifico',
};