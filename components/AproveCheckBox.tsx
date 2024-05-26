'use client';

import { DesktopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import React, { useEffect, useState } from 'react'

function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
  
    if (!mounted) return null;
    return <Tabs defaultValue='light'>
        <TabsList className='border'>
            <TabsTrigger value='not set' onClick={() => setTheme('light')}>
                <SunIcon className='h-[1.2rem] w-[1.2rem]'/>
            </TabsTrigger>
            <TabsTrigger value='approved' onClick={() => setTheme('dark')}>
                <MoonIcon className='h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0'/>
            </TabsTrigger>
            <TabsTrigger value='denied' onClick={() => setTheme('system')}>
                <DesktopIcon className='h-[1.2rem] w-[1.2rem]'/>
            </TabsTrigger>
        </TabsList>
    </Tabs>
}

export default ThemeSwitcher