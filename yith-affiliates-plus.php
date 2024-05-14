<?php
/**
 * Plugin Name: Yith Affiliates Plus
 * Version: 1.0.0
 * Plugin URI: https://clouds.band
 * Description: Enhance Yith Affiliates plugin with new features
 * Author: José Manuel Blasco (manuman)
 * Author URI: https://clouds.band
 * Requires at least: 4.0
 * Tested up to: 4.0
 *
 * Text Domain: yith-affiliates-plus
 * Domain Path: /lang/
 *
 * @package WordPress
 * @author José Manuel Blasco
 * @since 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load plugin class files.
require_once 'includes/class-yith-affiliates-plus.php';
require_once 'includes/class-yith-affiliates-plus-settings.php';

// Load plugin libraries.
require_once 'includes/lib/class-yith-affiliates-plus-admin-api.php';
require_once 'includes/lib/class-yith-affiliates-plus-post-type.php';
require_once 'includes/lib/class-yith-affiliates-plus-taxonomy.php';

/**
 * Returns the main instance of Yith_Affiliates_Plus to prevent the need to use globals.
 *
 * @since  1.0.0
 * @return object Yith_Affiliates_Plus
 */
function yith_affiliates_plus() {
	$instance = Yith_Affiliates_Plus::instance( __FILE__, '1.0.0' );

	if ( is_null( $instance->settings ) ) {
		$instance->settings = Yith_Affiliates_Plus_Settings::instance( $instance );
	}

	return $instance;
}

yith_affiliates_plus();
