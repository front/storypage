/**
 * External blocks (from Gutenberg Cloud)
 */

// Load external blocks
import { registerBlocks as registerCloudBlocks } from '@frontkom/g-hero-section';
import '@frontkom/g-hero-section/build/style.css';


// Register external blocks
export const initExternalBlocks = () => {
  registerCloudBlocks();
};
