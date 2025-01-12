import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene from './scene';
import useSpline from '@splinetool/r3f-spline';
import * as THREE from 'three';
import {
    OrbitControls,
    OrthographicCamera,
    PerspectiveCamera,
    Text,
} from '@react-three/drei';
import Calculator from './Colculyator_protatipe';
gsap.registerPlugin(ScrollTrigger);

function App() {
    const [ref, setref] = useState();
    const [ref2, setref2] = useState();
    const [zRotation, setzRotation] = useState(0);
    const [is2Section, setis2Section] = useState(false);
    const [clickCount, setClickCount] = useState(0); // Track the number of clicks
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const Key_0 = useRef();
    const Key_1 = useRef();
    const Key_2 = useRef();
    const Key_3 = useRef();
    const Key_4 = useRef();
    const Key_5 = useRef();
    const Key_6 = useRef();
    const Key_7 = useRef();
    const Key_8 = useRef();
    const Key_9 = useRef();
    const Key_comma = useRef();
    const Key_mins = useRef();
    const Key_plus = useRef();
    const Key_Clear = useRef();
    const Key_Minus_Plus = useRef();
    const Key_multiplication = useRef();
    const Key_percent = useRef();
    const Key_divide = useRef();
    const Key_equals = useRef();

    const purpleDivRef = useRef();
    const groupRef = useRef(null);
    const group2Ref = useRef(null);
    const containerRef = useRef(null);
    const sectionsRef = useRef(null);
    const sectionsRef2 = useRef(null);
    const clickSound = new Audio('/sound/keyboard.mp3'); // Path to your sound file
    const clickSound2 = new Audio('/sound/keyboard2.mp3'); // Path to your sound file

    //keypress animation function
    const animateKey = (key, value) => {
        // clickSound.currentTime = 0; // Reset to the start
        if (clickCount === 0) {
            clickSound.play(); // Play the first sound
        } else {
            clickSound2.play(); // Play the second sound
        }
        setClickCount((prevCount) => (prevCount + 1) % 2); // Toggle between 0 and 1

        clickSound.play();
        gsap.to(key.current.position, {
            y: -200,
            duration: 0.2,
            onComplete: () => {
                gsap.to(key.current.position, { y: 0, duration: 0.2 });
            },
        });
        handleButtonClick(value);
    };

    // Cack functionality
    const handleButtonClick = (value) => {
        switch (value) {
            case 'C': {
                // Reset the input and result
                setInput('');
                setResult('');
                break;
            }

            case '=': {
                try {
                    // Validate and evaluate the input expression
                    if (input && /^[0-9+\-*/.%() ]+$/.test(input)) {
                        const evaluatedResult = eval(input); // Evaluate the input safely
                        const formattedResult = evaluatedResult.toString();
                        setInput(formattedResult); // Update the input with the result
                        setResult(formattedResult); // Optionally store the result
                    } else {
                        throw new Error('Invalid Expression');
                    }
                } catch {
                    setInput('Error');
                    setResult('');
                }
                break;
            }

            case '+/-': {
                // Toggle the sign of the current input
                setInput((prevInput) => {
                    if (!prevInput) return ''; // Do nothing for empty input
                    if (prevInput.startsWith('-')) {
                        return prevInput.slice(1); // Remove the negative sign
                    } else {
                        return '-' + prevInput; // Add a negative sign
                    }
                });
                break;
            }

            case '%': {
                // Calculate percentage of the current input
                setInput((prevInput) => {
                    if (!prevInput || isNaN(prevInput)) return prevInput; // Ignore invalid input
                    const percentageValue = (
                        parseFloat(prevInput) / 100
                    ).toString();
                    setResult(percentageValue); // Optionally store the percentage result
                    return percentageValue;
                });
                break;
            }

            default: {
                // Prevent consecutive operators
                if (/[\+\-\*\/%]$/.test(input) && /[\+\-\*\/%]/.test(value)) {
                    return; // Ignore if the last character is an operator
                }

                // Prevent multiple decimal points in the same number
                if (value === '.' && /[0-9]*\.[0-9]*$/.test(input)) {
                    return; // Ignore additional decimal points
                }

                // Append the value to the input string
                setInput((prevInput) => prevInput + value);
            }
        }
    };

    //cheking is user in the 2 section
    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                setis2Section(entry.isIntersecting);
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            root: null, // Viewport
            threshold: 0.5, // Trigger when 50% of the section is visible
        });

        if (sectionsRef2.current) observer.observe(sectionsRef2.current);

        return () => {
            if (sectionsRef2.current) observer.unobserve(sectionsRef2.current);
        };
    }, []);
    //animation on the 2 section keyy press
    useEffect(() => {
        const timeline = gsap.timeline();

        if (is2Section) {
            // Add a delay before starting the animation
            timeline
                .add(() => console.log('Animation starting...'), '+=1')

                .call(() => {
                    setInput('H');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('Hi');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('Hi!');
                })
                .add(() => console.log('Animation starting...'), '+=0.7')
                .call(() => {
                    setInput('M');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My');
                })

                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My N');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My Na');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My Nam');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My Name');
                })

                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My Name i');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My Name is');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My Name is.');
                })
                .add(() => console.log('Animation starting...'), '+=0.3')
                .call(() => {
                    setInput('My Name is..');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('My Name is...');
                })
                .add(() => console.log('Animation starting...'), '+=0.7') //Numenator
                .call(() => {
                    setInput('Numenator');
                })
                .add(() => console.log('Animation starting...'), '+=0.5') //Numenator
                .call(() => {
                    setInput('Numenator-');
                })
                .add(() => console.log('Animation starting...'), '+=0.5') //Numenator
                .call(() => {
                    setInput('Numenator-Ai');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('W');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('Wh');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('Wha');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What');
                })

                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What c');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What ca');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What can');
                })

                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What can i');
                })

                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What can i d');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What can i do');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What can i do?');
                })
                .add(() => console.log('Animation starting...'), '+=0.7') //Numenator
                .call(() => {
                    setInput('W');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('Wh');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('Wha');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What');
                })

                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What e');
                })

                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What ew');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What ewr');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What ewr u');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What ewr u w');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What ewr u wa');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What ewr u wan');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('What ewr u want');
                })
                .add(() => console.log('Animation starting...'), '+=0.7') //Numenator
                .call(() => {
                    setInput('A');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('An');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('And ');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('And m');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('And mo');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('And mor');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('And more');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('And more 😉');
                })
                .add(() => console.log('Animation starting...'), '+=0.7') //Numenator
                .call(() => {
                    setInput('B');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('Bu');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u n');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u ne');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u nee');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u need');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u need p');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u need pr');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u need pro');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('But u need pro');
                })
                .add(() => console.log('Animation starting...'), '+=0.7') //Numenator
                .call(() => {
                    setInput('I');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I u');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I un');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I und');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I unde');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I under');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I unders');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I underst');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I understa');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator
                .call(() => {
                    setInput('I understan');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('I understand');
                })
                .add(() => console.log('Animation starting...'), '+=0.7') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U!');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r W');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wa');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wal');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wall');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Walle');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wallet');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wallet`s');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wallet`s e');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wallet`s em');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wallet`s emp');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wallet`s empt');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('U`r Wallet`s empty!');
                })
                .add(() => console.log('Animation starting...'), '+=0.7') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So n');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So no');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now u');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now us');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use s');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use si');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use sim');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simp');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simpl');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simple');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simple v');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simple ve');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simple ver');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simple vers');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simple versi');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simple versio');
                })
                .add(() => console.log('Animation starting...'), '+=0.3') //Numenator Wallet's empty!
                .call(() => {
                    setInput('So now use simple version');
                });
        } else {
            timeline.pause(); // Optional: Stop the timeline if is2Section is false
            if (Key_Clear.current) {
                animateKey(Key_Clear, 'C');
            }
        }

        return () => {
            timeline.kill(); // Clean up the timeline on unmount or re-render
            if (Key_Clear.current) {
                animateKey(Key_Clear, 'C');
            }
        };
    }, [is2Section]);
    //smopth scroll
    useEffect(() => {
        if (!containerRef.current) return;

        const sections = containerRef.current.querySelectorAll('section');
        sectionsRef.current = sections;

        let currentIndex = 0;
        let isScrolling = false;

        const scrollToSection = (index) => {
            if (!sections[index]) return;
            isScrolling = true;

            sections[index].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });

            setTimeout(() => {
                isScrolling = false;
            }, 1000); // Allow 1 second for the smooth scroll animation to complete
        };

        const handleScroll = (event) => {
            if (isScrolling) return;

            const direction = event.deltaY > 0 ? 1 : -1;
            const nextIndex = currentIndex + direction;

            if (nextIndex >= 0 && nextIndex < sections.length) {
                currentIndex = nextIndex;
                scrollToSection(currentIndex);
            }
        };

        containerRef.current.addEventListener('wheel', handleScroll);

        return () => {
            containerRef.current?.removeEventListener('wheel', handleScroll);
        };
    }, []);
    // Rotation animation for 3D object
    useEffect(() => {
        const rotationAnimation = gsap.to(
            {},
            {
                duration: 10, // Duration for one full rotation
                repeat: -1, // Infinite loop
                ease: 'none', // No easing for constant speed
                onUpdate: () => {
                    if (groupRef.current) {
                        setref(groupRef.current);
                        groupRef.current.rotation.z += 0.01; // Incrementally rotate
                        setzRotation(groupRef.current.rotation.z);
                        if (group2Ref.current) {
                            setref2(group2Ref.current);
                        }
                    }
                },
            }
        );
        ScrollTrigger.create({
            trigger: 'section',
            start: 'center center',
            end: 'center+=100% center',
            onEnter: () => rotationAnimation.kill(), // Stop rotation
            onLeaveBack: () => {
                rotationAnimation.restart(); // Restart rotation if scrolling back
            },
            scrub: 1, // Smooth animation with scroll
            markers: false, // Enable debugging markers
        });
        return () => rotationAnimation.kill(); // Cleanup on unmount
    }, []);

    // GSAP animations for divs
    useEffect(() => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: 'section',
                start: 'center center',
                end: 'center+=200% center',
                scrub: 1,
                markers: false,
            },
        });
        const timeline2 = gsap.timeline({
            scrollTrigger: {
                trigger: 'section',
                start: 'center center',
                end: 'center+=200% center',
                scrub: 1,
                markers: false,
            },
        });
        const timeline3 = gsap.timeline({
            scrollTrigger: {
                trigger: 'section',
                start: 'center center',
                end: 'center+=200% center',
                scrub: 1,
                markers: false,
            },
        });

        // First animation: Expand to 60%
        timeline.to(purpleDivRef.current, {
            width: '60%',
            ease: 'power2.inOut',
            duration: 2,
        });

        // Second animation: Shrink to 0%
        timeline.to(purpleDivRef.current, {
            width: '0%',
            ease: 'power2.inOut',
            duration: 2,
        });
        gsap.to(ref?.rotation, {
            z: 9.3, // Rotate to 3000 radians (or another value as needed)
            ease: 'none',
            duration: 2,
            scrollTrigger: {
                trigger: 'section',
                start: 'center center',
                end: 'center+=100% center',
                scrub: 1,
                markers: false,
            },
        });

        gsap.to(ref2?.rotation, {
            y: -40.85, // Rotate to 3000 radians (or another value as needed)
            ease: 'none',
            duration: 2,
            scrollTrigger: {
                trigger: 'section',
                start: 'center+=100% center',
                end: 'center+=200% center',
                scrub: 1,
                markers: false,
            },
        });
        timeline2.to(ref?.position, {
            x: -6500, // Move to [-5000, 0, 0]
            ease: 'power2.inOut',
        });
        timeline2.to(ref?.position, {
            x: 0, // Move to [-5000, 0, 0]
            ease: 'power2.inOut',
        });

        timeline3.to(ref?.scale, {
            x: 1.9, // Scale in X direction (adjust as needed)
            y: 1.9, // Scale in Y direction (adjust as needed)
            z: 1.9, // Scale in Z direction (adjust as needed)
            ease: 'power2.inOut', // Easing for scaling
            duration: 2, // Duration for scale change
        });
        timeline3.to(ref?.scale, {
            x: 1, // Scale in X direction (adjust as needed)
            y: 1, // Scale in Y direction (adjust as needed)
            z: 1, // Scale in Z direction (adjust as needed)
            ease: 'power2.inOut', // Easing for scaling
            duration: 2, // Duration for scale change
        });
        console.log('ref2', ref2);
    }, [ref, ref2]);
    //key press animation
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === '0') {
                console.log('Key 0 pressed!');
                animateKey(Key_0, 0);
            } else if (event.key === '1') {
                console.log('Key 1 pressed!');
                animateKey(Key_1, 1);
            } else if (event.key === '2') {
                console.log('Key 2 pressed!');
                animateKey(Key_2, 2);
            } else if (event.key === '3') {
                console.log('Key 3 pressed!');
                animateKey(Key_3, 3);
            } else if (event.key === '4') {
                console.log('Key 4 pressed!');
                animateKey(Key_4, 4);
            } else if (event.key === '5') {
                console.log('Key 5 pressed!');
                animateKey(Key_5, 5);
            } else if (event.key === '6') {
                console.log('Key 6 pressed!');
                animateKey(Key_6, 6);
            } else if (event.key === '7') {
                console.log('Key 7 pressed!');
                animateKey(Key_7, 7);
            } else if (event.key === '8') {
                console.log('Key 8 pressed!');
                animateKey(Key_8, 8);
            } else if (event.key === '9') {
                console.log('Key 9 pressed!');
                animateKey(Key_9, 9);
            } else if (event.key === '-') {
                console.log('Key - pressed!');
                animateKey(Key_mins, '-');
            } else if (event.key === '+') {
                console.log('Key + pressed!');
                animateKey(Key_plus, '+');
            } else if (event.key === 'C' || event.key === 'c') {
                console.log('Key C pressed!');
                animateKey(Key_Clear, 'C');
            } else if (event.key === '*') {
                console.log('Key * pressed!');
                animateKey(Key_multiplication, '*');
            } else if (event.key === '/') {
                console.log('Key / pressed!');
                animateKey(Key_divide, '/');
            } else if (event.key === 'Enter' || event.key === '=') {
                console.log('Key = pressed!');
                animateKey(Key_equals, '=');
            } else if (event.key === ',' || event.key === '.') {
                console.log('Key = .!');
                animateKey(Key_Minus_Plus, '.');
            } else if (event.key === 'm') {
                console.log('Key = .!');
                animateKey(Key_Minus_Plus, '+/-');
            } else if (event.key === '%') {
                console.log('Key = %!');
                animateKey(Key_percent, '%');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    //materials and gemetry
    const cameraref = useRef(); // Reference to the group
    const { nodes, materials } = useSpline(
        'https://prod.spline.design/Do6WIdvJFqSU2Rwe/scene.splinecode'
    );
    materials.text.color = '#000000';

    const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uColor: { value: new THREE.Color('#000000') }, // Base black color for the stone
            uTime: { value: 0.0 }, // Time for any animation (optional)
        },
        vertexShader: `
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            void main() {
                vNormal = normalize(normalMatrix * normal); // Calculate the normal in view space
                vPosition = position; // Pass the vertex position to fragment shader
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            uniform float uTime;
            varying vec3 vNormal;
            varying vec3 vPosition;
            
            // Function for simulating sharp surface highlights
            float sharpSurface(vec3 normal, vec3 lightDir) {
                float diff = max(dot(normal, lightDir), 0.0);
                return pow(diff, 16.0); // Use a high exponent for sharp reflections (like glossy stone)
            }
    
            void main() {
                vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Simulated light direction
    
                // Simulate sharp specular highlights
                float highlight = sharpSurface(vNormal, lightDir);
    
                // Color calculation: base black with sharp highlights
                vec3 color = uColor + vec3(highlight * 0.2); // Brighten the highlight areas
                
                // Combine with a slight noise or shimmer effect to add realism (optional)
                float shimmer = sin(vPosition.x * 10.0 + uTime) * 0.05;
                color += vec3(shimmer, shimmer * 0.3, shimmer * 0.1);
    
                gl_FragColor = vec4(color, 1.0); // Final color with sharp highlights
            }
        `,
        // Optionally enable wireframe and smooth shading
        wireframe: false,
        flatShading: false,
    });
    return (
        <div className="relative overflow-hidden h-[300vh]" ref={containerRef}>
            {/* Section 1 */}
            <section className="w-full h-[100vh] z-30">
                <h1 className="text-[190px] font-bold leading-[180px] text-wrap w-[60%] p-4">
                    Welcome to my first 3D web App
                </h1>
            </section>
            {/* Section 2 */}
            <section
                className="w-full h-[100vh] z-10 flex flex-row .section2"
                ref={sectionsRef2}
            >
                <img
                    src="/images/comics.png"
                    className="w-[60%] h-full opacity-30"
                />
                <div className=" m-auto ">
                    <h2
                        className="text-[60px] font-bold text-center"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        Calck like A Pro
                    </h2>
                    <p
                        className="text-[24px] font-normal text-center p-4"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                        With this calculator, you'll be so smart, even your pet
                        will start asking for advice...
                    </p>
                    {/* <Calculator /> */}
                </div>
            </section>
            {/* Section 3 */}
            <section className="w-full h-[100vh] z-10 flex flex-col  items-center justify-between py-12">
                <h3 className="text-[60px] leading-[70px] text-center w-[60%] font-bold text-gradient">
                    Explore Unlimited Calculations at Your Fingertips
                </h3>
                <p className="text-[24px] text-gray-600 mt-4 animate-pulse">
                    Just click any key on the calculator or use the numpad to
                    get started.
                </p>
            </section>
            {/* Three.js Scene */}
            <div className="fixed top-0 right-0 h-[100vh] w-full z-20">
                <Canvas>
                    {/* <Scene
                        groupRef={groupRef}
                        groupRotation={[0, -40, 0]}
                        position={[5000, 0, 0]}
                        rotation={[0, 0, 3]}
                        scale={1.7}
                        enableZoom={false}
                        enableRotate={false}
                        enablePan={false}
                    /> */}
                    <group
                        position={[5000, 0, 0]}
                        rotation={[0, 0, 3]}
                        scale={1.7}
                        // dispose={null}
                        ref={groupRef}
                    >
                        <group rotation={[0, -40, 0]} ref={group2Ref}>
                            <mesh
                                castShadow
                                receiveShadow
                                position={[73.64, 200.22, -2691.01]}
                                rotation={[0, 0, 0]}
                            >
                                {/* Border - Box geometry around the text */}

                                {/* Text */}
                                <Text
                                    fontSize={500}
                                    color={input === 'Error' ? 'red' : 'black'}
                                    position={[-1850, 0, 0]}
                                    rotation={[-1.6, 0, 0]}
                                    anchorX="end"
                                    textAlign="end"
                                    maxWidth={3810}
                                    anchorY="middle"
                                    // material-transparent
                                    // color={input === 'Error' ? 'red' : 'black'}

                                    material-depthTest={
                                        input === 'Error' ? true : false
                                    }
                                >
                                    {input.length > 13
                                        ? !is2Section
                                            ? input.slice(-13)
                                            : input.slice(-14)
                                        : input || '0'}
                                </Text>
                            </mesh>

                            <scene name="Scene 1">
                                <group name="kalkulyator">
                                    <mesh
                                        name="Text"
                                        geometry={nodes.Text.geometry}
                                        material={materials['Text Material']}
                                        castShadow
                                        receiveShadow
                                        position={[-740.65, -600.1, 1695.16]}
                                        rotation={[39.26, 0, -1]}
                                        scale={[1, 1, 2.66]}
                                    />
                                    {/* <mesh
                                        name="developer.png"
                                        geometry={
                                            nodes['developer.png'].geometry
                                        }
                                        material={
                                            materials['developer.png Material']
                                        }
                                        castShadow
                                        receiveShadow
                                        position={[1500, -583.76, -2210.12]}
                                        rotation={[1.57, 0, -2.91]}
                                        scale={1}
                                    ></mesh> */}
                                    <mesh
                                        name="Cube 2"
                                        geometry={nodes['Cube 2'].geometry}
                                        material={shaderMaterial}
                                        castShadow
                                        receiveShadow
                                        position={[101.98, -356.39, 67.89]}
                                        rotation={[Math.PI / 2, 0, 0]}
                                    />
                                    <group
                                        name="Group"
                                        position={[75, -3.61, -2705.63]}
                                        scale={[1.03, 0.89, 1.18]}
                                    >
                                        <mesh
                                            name="Rectangle"
                                            geometry={nodes.Rectangle.geometry}
                                            material={
                                                materials['Rectangle Material']
                                            }
                                            castShadow
                                            receiveShadow
                                            position={[-26.87, 166.96, -41.46]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                        <mesh
                                            name="Cube 21"
                                            geometry={nodes['Cube 21'].geometry}
                                            material={
                                                materials['Cube 21 Material']
                                            }
                                            castShadow
                                            receiveShadow
                                            position={[0, 1.44, 0]}
                                            rotation={[-Math.PI / 2, 0, 0]}
                                        />
                                    </group>
                                    <group
                                        name="line5"
                                        position={[-1561.24, 372.19, 2887.02]}
                                    >
                                        <group
                                            onClick={() => {
                                                animateKey(Key_0, 0);
                                            }}
                                            ref={Key_0}
                                            name="key 0"
                                            position={[529.82, -28.67, 0]}
                                            scale={[2.06, 0.94, 1]}
                                        >
                                            <mesh
                                                name="key "
                                                geometry={
                                                    nodes['key '].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 22"
                                                    geometry={
                                                        nodes['Text 22']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        -28.64, 216, -34.95,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>
                                            </mesh>
                                        </group>

                                        <group
                                            name="key,"
                                            onClick={() => {
                                                animateKey(Key_comma, '.');
                                            }}
                                            ref={Key_comma}
                                            position={[2200.54, 0, 0]}
                                        >
                                            <mesh
                                                name="key 12"
                                                geometry={
                                                    nodes['key 12'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 23"
                                                    geometry={
                                                        nodes['Text 23']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        -2.55, 216, 14.25,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>
                                            </mesh>
                                        </group>
                                        <group
                                            name="key="
                                            onClick={() => {
                                                animateKey(Key_equals, '=');
                                            }}
                                            ref={Key_equals}
                                            position={[3300.81, 0, 0]}
                                        >
                                            <mesh
                                                name="key 13"
                                                geometry={
                                                    nodes['key 13'].geometry
                                                }
                                                material={materials['KEY 3']}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 24"
                                                    geometry={
                                                        nodes['Text 24']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>
                                            </mesh>
                                        </group>
                                    </group>
                                    <group
                                        name="line4"
                                        position={[-1561.24, 372.19, 1834.01]}
                                    >
                                        <group
                                            name="key1"
                                            ref={Key_1}
                                            onClick={() => {
                                                animateKey(Key_1, 1);
                                            }}
                                        >
                                            <mesh
                                                name="key 14"
                                                geometry={
                                                    nodes['key 14'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 25"
                                                    geometry={
                                                        nodes['Text 25']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            ref={Key_2}
                                            onClick={() => animateKey(Key_2, 2)}
                                            name="key2"
                                            position={[1100.27, 0, 0]}
                                        >
                                            <mesh
                                                name="key 15"
                                                geometry={
                                                    nodes['key 15'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 26"
                                                    geometry={
                                                        nodes['Text 26']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            onClick={() => {
                                                animateKey(Key_3, 3);
                                            }}
                                            ref={Key_3}
                                            name="key3"
                                            position={[2200.54, 0, 0]}
                                        >
                                            <mesh
                                                name="key 16"
                                                geometry={
                                                    nodes['key 16'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 27"
                                                    geometry={
                                                        nodes['Text 27']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key+"
                                            ref={Key_plus}
                                            onClick={() => {
                                                animateKey(Key_plus, '+');
                                            }}
                                            position={[3300.81, 0, 0]}
                                        >
                                            <mesh
                                                name="key 17"
                                                geometry={
                                                    nodes['key 17'].geometry
                                                }
                                                material={materials['KEY 3']}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 28"
                                                    geometry={
                                                        nodes['Text 28']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                    </group>
                                    <group
                                        name="line 3"
                                        position={[-1561.24, 372.19, 769.24]}
                                    >
                                        <group
                                            name="key4"
                                            onClick={() => {
                                                animateKey(Key_4, 4);
                                            }}
                                            ref={Key_4}
                                        >
                                            <mesh
                                                name="key 18"
                                                geometry={
                                                    nodes['key 18'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 29"
                                                    geometry={
                                                        nodes['Text 29']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key5"
                                            onClick={() => {
                                                animateKey(Key_5, 5);
                                            }}
                                            ref={Key_5}
                                            position={[1100.27, 0, 0]}
                                        >
                                            <mesh
                                                name="key 19"
                                                geometry={
                                                    nodes['key 19'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 210"
                                                    geometry={
                                                        nodes['Text 210']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key6"
                                            onClick={() => {
                                                animateKey(Key_6, 6);
                                            }}
                                            ref={Key_6}
                                            position={[2200.54, 0, 0]}
                                        >
                                            <mesh
                                                name="key 110"
                                                geometry={
                                                    nodes['key 110'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 211"
                                                    geometry={
                                                        nodes['Text 211']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key-"
                                            ref={Key_mins}
                                            onClick={() => {
                                                animateKey(Key_mins, '-');
                                            }}
                                            position={[3300.81, 0, 0]}
                                        >
                                            <mesh
                                                name="key 111"
                                                geometry={
                                                    nodes['key 111'].geometry
                                                }
                                                material={materials['KEY 3']}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 212"
                                                    geometry={
                                                        nodes['Text 212']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                    </group>
                                    <group
                                        name="line2"
                                        position={[-1561.28, 372.19, -306.66]}
                                    >
                                        <group
                                            name="key7"
                                            onClick={() => {
                                                animateKey(Key_7, 7);
                                            }}
                                            ref={Key_7}
                                        >
                                            <mesh
                                                name="key 112"
                                                geometry={
                                                    nodes['key 112'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 213"
                                                    geometry={
                                                        nodes['Text 213']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key8"
                                            onClick={() => {
                                                animateKey(Key_8, 8);
                                            }}
                                            ref={Key_8}
                                            position={[1100.27, 0, 0]}
                                        >
                                            <mesh
                                                name="key 113"
                                                geometry={
                                                    nodes['key 113'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 214"
                                                    geometry={
                                                        nodes['Text 214']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key9"
                                            onClick={() => {
                                                animateKey(Key_9, 9);
                                            }}
                                            ref={Key_9}
                                            position={[2200.54, 0, 0]}
                                        >
                                            <mesh
                                                name="key 114"
                                                geometry={
                                                    nodes['key 114'].geometry
                                                }
                                                material={materials.KEY}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 215"
                                                    geometry={
                                                        nodes['Text 215']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key *"
                                            ref={Key_multiplication}
                                            onClick={() => {
                                                animateKey(
                                                    Key_multiplication,
                                                    '*'
                                                );
                                            }}
                                            position={[3300.81, 0, 0]}
                                        >
                                            <mesh
                                                name="key 115"
                                                geometry={
                                                    nodes['key 115'].geometry
                                                }
                                                material={materials['KEY 3']}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 216"
                                                    geometry={
                                                        nodes['Text 216']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                    </group>
                                    <group
                                        name="line 1 "
                                        position={[-1561.24, 300.19, -1395.62]}
                                    >
                                        <group
                                            className="cursor-pointer"
                                            name="key c"
                                            onClick={() => {
                                                animateKey(Key_Clear, 'C');
                                            }}
                                            ref={Key_Clear}
                                            position={[0, 0, 0]}
                                        >
                                            <mesh
                                                name="key 116"
                                                geometry={
                                                    nodes['key 116'].geometry
                                                }
                                                material={materials['KEY 2']}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 217"
                                                    geometry={
                                                        nodes['Text 217']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key +/-"
                                            onClick={() => {
                                                animateKey(
                                                    Key_Minus_Plus,
                                                    '+/-'
                                                );
                                            }}
                                            ref={Key_Minus_Plus}
                                            position={[1100.27, 0, 0]}
                                        >
                                            <mesh
                                                name="key 117"
                                                geometry={
                                                    nodes['key 117'].geometry
                                                }
                                                material={materials['KEY 2']}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 218"
                                                    geometry={
                                                        nodes['Text 218']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        25.23, 216, 35.87,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key %"
                                            ref={Key_percent}
                                            onClick={() => {
                                                animateKey(Key_percent, '%');
                                            }}
                                            position={[2200.54, 0, 0]}
                                        >
                                            <mesh
                                                name="key 118"
                                                geometry={
                                                    nodes['key 118'].geometry
                                                }
                                                material={materials['KEY 2']}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 219"
                                                    geometry={
                                                        nodes['Text 219']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                        <group
                                            name="key /"
                                            ref={Key_divide}
                                            onClick={() => {
                                                animateKey(Key_divide, '/');
                                            }}
                                            position={[3300.81, 0, 0]}
                                        >
                                            <mesh
                                                name="key 119"
                                                geometry={
                                                    nodes['key 119'].geometry
                                                }
                                                material={materials['KEY 3']}
                                                castShadow
                                                receiveShadow
                                            >
                                                <mesh
                                                    name="Text 220"
                                                    geometry={
                                                        nodes['Text 220']
                                                            .geometry
                                                    }
                                                    material={materials.text}
                                                    castShadow
                                                    receiveShadow
                                                    position={[
                                                        33.63, 216, -102.75,
                                                    ]}
                                                    rotation={[
                                                        -Math.PI / 2,
                                                        0,
                                                        0,
                                                    ]}
                                                >
                                                    {' '}
                                                    <meshStandardMaterial
                                                        attach="material"
                                                        color="black"
                                                    />
                                                </mesh>{' '}
                                            </mesh>
                                        </group>
                                    </group>
                                    <mesh
                                        name="Cube"
                                        geometry={nodes.Cube.geometry}
                                        material={materials.text}
                                        castShadow
                                        receiveShadow
                                        position={[92.71, -144.39, 40.79]}
                                    />
                                </group>
                                <directionalLight
                                    name="Directional Light"
                                    castShadow
                                    intensity={0.2}
                                    shadow-mapSize-width={1024}
                                    shadow-mapSize-height={1024}
                                    shadow-camera-near={-10000}
                                    shadow-camera-far={100000}
                                    shadow-camera-left={-1000}
                                    shadow-camera-right={1000}
                                    shadow-camera-top={1000}
                                    shadow-camera-bottom={-1000}
                                    position={[1008.47, 4622.49, 918.72]}
                                />

                                <hemisphereLight
                                    name="Default Ambient Light"
                                    intensity={0.75}
                                    color="#eaeaea"
                                />
                            </scene>
                        </group>
                        <mesh
                            name="Box"
                            castShadow
                            receiveShadow
                            rotation={[0, 0, 0]}
                        >
                            <boxGeometry args={[6000, 6000, 6000]} />{' '}
                            {/* Box dimensions */}
                            <meshStandardMaterial
                                color="blue"
                                opacity={0}
                                transparent={true}
                            />
                        </mesh>
                    </group>

                    <PerspectiveCamera
                        ref={cameraref}
                        makeDefault
                        position={[0, -18624, 0]}
                        fov={45}
                        near={100}
                        far={100000}
                        zoom={1}
                    />
                    <OrbitControls
                        onChange={() => {
                            console.log(cameraref.current.position);
                        }}
                        enableZoom={false}
                        enableRotate={false} // Allow rotation
                        enablePan={false}
                        // Fix the vertical rotation (prevent tilt)
                        enableDamping={true} // Optional: Add smoothness to the rotation
                    />
                </Canvas>
            </div>
            {/* Background Divs */}
            <div className="w-full h-[100vh] fixed top-0 z-[-1] flex">
                {/* Purple Div */}
                <div
                    className="bg-[#4E17CF] w-[100%] h-full"
                    ref={purpleDivRef}
                ></div>
                {/* Black Div (Animated) */}
                {/* <div ref={blackDivRef} className="bg-black w-[0%] h-full"></div> */}
            </div>
        </div>
    );
}

export default App;
