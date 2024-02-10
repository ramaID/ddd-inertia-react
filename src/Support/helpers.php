<?php

declare(strict_types=1);

use Faker\Factory;
use Faker\Generator;

if (! function_exists('faker')) {
    function faker(): Generator
    {
        return Factory::create();
    }
}
