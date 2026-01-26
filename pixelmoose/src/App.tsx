import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  GlobalStyles,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import BoltIcon from '@mui/icons-material/Bolt'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import FacebookIcon from '@mui/icons-material/Facebook'
import HandshakeIcon from '@mui/icons-material/Handshake'
import LayersIcon from '@mui/icons-material/Layers'
import MenuIcon from '@mui/icons-material/Menu'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import StorefrontIcon from '@mui/icons-material/Storefront'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import * as mammoth from 'mammoth/mammoth.browser'

const LogoLockup = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.75),
}))

const LogoWordmark = ({
  logoSize = { xs: 96, sm: 112, md: 128 },
}: {
  logoSize?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  } | number
}) => (
  <LogoLockup>
    <Box
      component="img"
      src={`${import.meta.env.BASE_URL}images/Logo/PixelMoose_logo.png`}
      alt="Pixel Moose logo"
      sx={{ width: logoSize, height: 'auto', maxWidth: '100%' }}
    />
  </LogoLockup>
)

const GlassCard = styled(Paper)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(3.5),
  border: '1px solid rgba(255,255,255,0.6)',
  background: 'linear-gradient(145deg, rgba(255,255,255,0.92), rgba(252,245,238,0.62))',
  boxShadow: '0 24px 60px rgba(13, 17, 23, 0.12)',
  backdropFilter: 'blur(14px)',
  transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 34px 80px rgba(13, 17, 23, 0.18)',
    borderColor: 'rgba(239,108,47,0.35)',
  },
}))

const TagChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  fontWeight: 600,
  letterSpacing: '0.02em',
  border: '1px solid rgba(38, 42, 47, 0.12)',
  backgroundColor: 'rgba(255,255,255,0.9)',
  color: theme.palette.text.primary,
}))

const SectionKicker = styled(TagChip)(({ theme }) => ({
  fontSize: '1rem',
  padding: theme.spacing(0.6, 2.6),
  height: 'auto',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}))

const IconBadge = styled('span')(({ theme }) => ({
  width: 54,
  height: 54,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, rgba(239, 108, 47, 0.18), rgba(239, 108, 47, 0.04))',
  color: theme.palette.primary.dark,
}))

type ProjectGalleryItem = {
  src: string
  alt: string
  description: string
}

type Project = {
  image: string
  imageAlt: string
  title: string
  description: string
  tags: string[]
  status?: string
  links?: { label: string; href: string }[]
  gallery: ProjectGalleryItem[]
}

type BlogPost = {
  id: string
  title: string
  date: string
  summary: string
  tags: string[]
  docxPath: string
  readTime?: string
}

const PrimaryButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  padding: theme.spacing(1.3, 3.5),
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 16px 40px rgba(239, 108, 47, 0.35)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 22px 50px rgba(239, 108, 47, 0.4)',
  },
}))

const GhostButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  padding: theme.spacing(1.3, 3.5),
  fontWeight: 700,
  textTransform: 'none',
  border: '1px solid rgba(38, 42, 47, 0.2)',
  transition: 'transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: 'rgba(15, 76, 92, 0.35)',
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
}))

const HeroGraphicPanel = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 36,
  padding: theme.spacing(3),
  background: 'linear-gradient(150deg, rgba(255,255,255,0.92), rgba(252,245,238,0.7))',
  border: '1px solid rgba(255,255,255,0.7)',
  boxShadow: '0 28px 80px rgba(24, 20, 16, 0.16)',
  backdropFilter: 'blur(16px)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 20% 20%, rgba(239,108,47,0.16), transparent 55%)',
    pointerEvents: 'none',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'radial-gradient(rgba(15,76,92,0.18) 1px, transparent 1px)',
    backgroundSize: '22px 22px',
    opacity: 0.15,
    pointerEvents: 'none',
  },
}))

const Section = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(10, 0),
  scrollMarginTop: theme.spacing(12),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(14, 0),
  },
}))

const PageContainer = styled(Container)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
}))

const WorkSection = styled(Section)({
  background:
    'linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(255,243,230,0.95) 45%, rgba(248,238,230,0.75) 100%)',
  borderTop: '1px solid rgba(255,255,255,0.9)',
  borderBottom: '1px solid rgba(255,255,255,0.9)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at 15% 20%, rgba(239,108,47,0.18), transparent 45%), radial-gradient(circle at 85% 30%, rgba(15,76,92,0.16), transparent 50%)',
    pointerEvents: 'none',
  },
})

const SectionTitle = ({
  kicker,
  title,
  subtitle,
}: {
  kicker: string
  title: string
  subtitle: string
}) => (
  <Stack spacing={2} sx={{ maxWidth: 620 }}>
    <SectionKicker label={kicker} />
    <Typography variant="h2">{title}</Typography>
    <Typography variant="body1" color="text.secondary">
      {subtitle}
    </Typography>
  </Stack>
)

const StatCard = ({
  value,
  label,
}: {
  value: string
  label: string
}) => (
  <GlassCard elevation={0}>
    <Stack spacing={1}>
      <Typography variant="h3">{value}</Typography>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Stack>
  </GlassCard>
)

const ServiceCard = ({
  icon,
  title,
  description,
}: {
  icon: ReactElement
  title: string
  description: string
}) => (
  <GlassCard elevation={0}>
    <Stack spacing={2}>
      <IconBadge>{icon}</IconBadge>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Stack>
  </GlassCard>
)

const ProjectCard = ({
  image,
  imageAlt,
  title,
  description,
  tags,
  status,
  links,
  onOpen,
}: {
  image: string
  imageAlt: string
  title: string
  description: string
  tags: string[]
  status?: string
  links?: { label: string; href: string }[]
  onOpen?: () => void
}) => (
  <Box
    sx={{
      p: 0.6,
      borderRadius: 30,
      background:
        'linear-gradient(135deg, rgba(239,108,47,0.28), rgba(15,76,92,0.2))',
      boxShadow: '0 30px 70px rgba(15, 76, 92, 0.18)',
      height: '100%',
    }}
  >
    <GlassCard
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        minHeight: { xs: 'auto', md: 560 },
        display: 'flex',
        flexDirection: 'column',
        cursor: onOpen ? 'pointer' : 'default',
        '&:hover .project-preview-overlay': {
          opacity: 1,
          transform: 'translateY(0)',
        },
      }}
      role={onOpen ? 'button' : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? `Open ${title} gallery` : undefined}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (!onOpen) return
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen()
        }
      }}
    >
      <Stack spacing={2.5} sx={{ flex: 1 }}>
        {image ? (
          <Box sx={{ position: 'relative' }}>
            <Box
              component="img"
              src={image}
              alt={imageAlt}
              sx={{
                width: '100%',
                height: { xs: 210, sm: 240 },
                objectFit: 'cover',
                borderRadius: '20px',
                boxShadow: '0 16px 32px rgba(15, 76, 92, 0.16)',
              }}
            />
            {onOpen && (
              <Box
                className="project-preview-overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '20px',
                  background:
                    'linear-gradient(180deg, rgba(15,76,92,0.05) 0%, rgba(15,76,92,0.6) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  padding: 2,
                  opacity: 0,
                  transform: 'translateY(6px)',
                  transition: 'opacity 0.25s ease, transform 0.25s ease',
                  pointerEvents: 'none',
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ color: '#FFFFFF', letterSpacing: '0.16em' }}
                >
                  Click to see images
                </Typography>
              </Box>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: { xs: 210, sm: 240 },
              borderRadius: '20px',
              border: '1px dashed rgba(15, 76, 92, 0.3)',
              backgroundColor: 'rgba(255,255,255,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="overline" color="text.secondary">
              Add cover image
            </Typography>
          </Box>
        )}
        {status && (
          <Stack direction="row" spacing={1} alignItems="center">
            <TagChip label={status} size="small" />
          </Stack>
        )}
        <Stack spacing={1}>
          <Typography variant="h5">{title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" sx={{ borderRadius: 999 }} />
          ))}
        </Stack>
        {links && links.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {links.map((link) => (
              <Button
                key={link.href}
                size="small"
                variant="outlined"
                href={link.href}
                endIcon={<ArrowOutwardIcon fontSize="small" />}
                onClick={(event) => event.stopPropagation()}
                sx={{ borderRadius: 999, textTransform: 'none' }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        )}
      </Stack>
    </GlassCard>
  </Box>
)

const ProcessStep = ({
  step,
  title,
  description,
}: {
  step: string
  title: string
  description: string
}) => (
  <GlassCard elevation={0}>
    <Stack spacing={2}>
      <Typography variant="overline" color="primary.main">
        {step}
      </Typography>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Stack>
  </GlassCard>
)

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState<null | HTMLElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [zoomLevel, setZoomLevel] = useState(1)
  const pinchStartDistanceRef = useRef<number | null>(null)
  const pinchStartZoomRef = useRef(1)
  const [page, setPage] = useState<'home' | 'blog'>('home')
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null)
  const [blogHtml, setBlogHtml] = useState('')
  const [blogLoading, setBlogLoading] = useState(false)
  const [blogError, setBlogError] = useState('')

  useEffect(() => {
    let raf = 0
    const handleScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        setScrollY(window.scrollY)
        raf = 0
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const blogHash = '#/blog'
    const sectionHashes = new Set(['#work', '#services', '#process', '#contact'])

    const handleHashChange = () => {
      const { hash } = window.location
      const nextPage = hash.startsWith(blogHash) ? 'blog' : 'home'
      setPage(nextPage)

      if (nextPage === 'home' && sectionHashes.has(hash)) {
        requestAnimationFrame(() => {
          const target = document.querySelector(hash)
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } else if (nextPage === 'blog') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const openMobileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget)
  }

  const closeMobileMenu = () => {
    setMobileMenuAnchor(null)
  }

  const openProjectGallery = (project: Project) => {
    setSelectedProject(project)
    setActiveImageIndex(0)
    setZoomLevel(1)
  }

  const closeProjectGallery = () => {
    setSelectedProject(null)
    setActiveImageIndex(0)
    setZoomLevel(1)
  }

  const openBlogPost = (post: BlogPost) => {
    setSelectedBlogPost(post)
  }

  const closeBlogPost = () => {
    setSelectedBlogPost(null)
    setBlogHtml('')
    setBlogError('')
    setBlogLoading(false)
  }

  const goToNextImage = () => {
    if (!selectedProject) return
    setActiveImageIndex((current) =>
      (current + 1) % selectedProject.gallery.length,
    )
  }

  const goToPreviousImage = () => {
    if (!selectedProject) return
    setActiveImageIndex((current) =>
      (current - 1 + selectedProject.gallery.length) % selectedProject.gallery.length,
    )
  }

  useEffect(() => {
    setZoomLevel(1)
  }, [activeImageIndex])

  useEffect(() => {
    if (!selectedBlogPost) return
    let isActive = true
    const loadDocx = async () => {
      setBlogLoading(true)
      setBlogError('')
      setBlogHtml('')
      try {
        const response = await fetch(selectedBlogPost.docxPath)
        if (!response.ok) {
          throw new Error('Unable to load the Word document.')
        }
        const arrayBuffer = await response.arrayBuffer()
        const result = await mammoth.convertToHtml({ arrayBuffer })
        if (!isActive) return
        setBlogHtml(result.value)
      } catch (error) {
        if (!isActive) return
        setBlogError(
          error instanceof Error
            ? error.message
            : 'Unable to render the Word document.',
        )
      } finally {
        if (isActive) {
          setBlogLoading(false)
        }
      }
    }

    void loadDocx()

    return () => {
      isActive = false
    }
  }, [selectedBlogPost])

  const clampZoom = (value: number) => Math.min(3, Math.max(1, value))

  const handleZoomIn = () => {
    setZoomLevel((current) => clampZoom(Number((current + 0.25).toFixed(2))))
  }

  const handleZoomOut = () => {
    setZoomLevel((current) => clampZoom(Number((current - 0.25).toFixed(2))))
  }

  const handleZoomReset = () => {
    setZoomLevel(1)
  }

  const handlePinchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2) return
    const touchOne = event.touches.item(0)
    const touchTwo = event.touches.item(1)
    if (!touchOne || !touchTwo) return
    const distance = Math.hypot(
      touchTwo.clientX - touchOne.clientX,
      touchTwo.clientY - touchOne.clientY,
    )
    pinchStartDistanceRef.current = distance
    pinchStartZoomRef.current = zoomLevel
  }

  const handlePinchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 2 || pinchStartDistanceRef.current === null) return
    const touchOne = event.touches.item(0)
    const touchTwo = event.touches.item(1)
    if (!touchOne || !touchTwo) return
    const distance = Math.hypot(
      touchTwo.clientX - touchOne.clientX,
      touchTwo.clientY - touchOne.clientY,
    )
    const scale = distance / pinchStartDistanceRef.current
    setZoomLevel(clampZoom(Number((pinchStartZoomRef.current * scale).toFixed(2))))
  }

  const handlePinchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length < 2) {
      pinchStartDistanceRef.current = null
    }
  }

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
          primary: {
            main: '#EF6C2F',
            contrastText: '#FFFFFF',
          },
          secondary: {
            main: '#0F4C5C',
          },
          background: {
            default: '#F7F3EE',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1E1A17',
            secondary: '#4B4A45',
          },
        },
        shape: {
          borderRadius: 20,
        },
        typography: {
          fontFamily: '"Space Grotesk", sans-serif',
          h1: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 3.5vw, 4.4rem)',
            lineHeight: 1.05,
          },
          h2: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(2.3rem, 2.9vw, 3.5rem)',
          },
          h3: {
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(1.85rem, 2.4vw, 2.7rem)',
          },
          h5: {
            fontWeight: 700,
            fontSize: '1.3rem',
          },
          overline: {
            fontWeight: 700,
            fontSize: '0.95rem',
            letterSpacing: '0.08em',
          },
          body1: {
            fontSize: '1.05rem',
            lineHeight: 1.7,
          },
          body2: {
            lineHeight: 1.7,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 600,
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                borderRadius: 999,
              },
            },
          },
        },
      }),
    [],
  )

  const heroGraphic =
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'

  const studioImage =
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'

  const services = [
    {
      title: 'Business Digitization',
      description:
        'We map your paper-heavy workflows and replace them with simple, reliable digital systems.',
      icon: <AutoAwesomeIcon />,
    },
    {
      title: 'Custom Web Applications',
      description:
        'Bespoke platforms that streamline admin work, keep teams aligned, and reduce manual errors.',
      icon: <LayersIcon />,
    },
    {
      title: 'Android + iOS Apps',
      description:
        'Native-feeling mobile apps for field teams, customers, and staff on the move.',
      icon: <RocketLaunchIcon />,
    },
  ]

  const projectImageBase = `${import.meta.env.BASE_URL}images/projects`

  const projects: Project[] = [
    {
      image: `${projectImageBase}/mj_foodbank_app/mjfoodbank_app_cover.png`,
      imageAlt: 'Team planning a booking workflow on a whiteboard',
      title: 'Moose Jaw Food Bank Booking + Admin Web App',
      description:
        'Clients and volunteers book appointments and view visit history. Staff manage visits, food distribution, donation tracking, timesheets, leave, and trends.',
      tags: ['Web App', 'Booking', 'Operations'],
      status: 'Completed',
      links: [
        { label: 'Live App', href: 'https://app.mjfoodbank.org' },
      ],
      gallery: [
        {
          src: `${projectImageBase}/mj_foodbank_app/mobile_view_client.JPG`,
          alt: 'Mobile client booking view for the food bank app',
          description:
            'Client booking view optimized for quick mobile check-ins and appointment details.',
        },
        {
          src: `${projectImageBase}/mj_foodbank_app/foodbank_visit_trends.png`,
          alt: 'Food bank visit trends dashboard',
          description:
            'Visit trends dashboard highlighting seasonal demand and appointment volume.',
        },
        {
          src: `${projectImageBase}/mj_foodbank_app/warehouse_dashbaord.png`,
          alt: 'Food bank warehouse dashboard',
          description:
            'Operations dashboard for warehouse inventory, pickups, and distribution planning.',
        },
      ],
    },
    {
      image: `${projectImageBase}/mj_foodbank_app/MJ_foodbank_android_cover.png`,
      imageAlt: 'Android phone on a desk showing an app experience',
      title: 'Moose Jaw Food Bank Android App',
      description:
        'Android app for clients and volunteers to book appointments and manage visits on the go.',
      tags: ['Android', 'Mobile', 'TWA'],
      status: 'Completed',
      links: [
        {
          label: 'Play Store',
          href: 'https://play.google.com/store/apps/details?id=org.mjfoodbank.app.twa&pcampaignid=web_share',
        },
      ],
      gallery: [
        {
          src: `${projectImageBase}/mj_foodbank_android/Image (1).jpg`,
          alt: 'Android app home screen for the food bank',
          description:
            'Home screen focused on quick actions for bookings and visit history.',
        },
        {
          src: `${projectImageBase}/mj_foodbank_android/Image (2).jpg`,
          alt: 'Android booking calendar view',
          description:
            'Booking calendar view for selecting dates and confirming appointment times.',
        },
        {
          src: `${projectImageBase}/mj_foodbank_android/Image (3).jpg`,
          alt: 'Android app visit details screen',
          description:
            'Visit details and volunteer tools for managing on-site activity.',
        },
        {
          src: `${projectImageBase}/mj_foodbank_android/Image (4).png`,
          alt: 'Android app secondary screen view',
          description:
            'Additional Android screen for supporting appointment workflows.',
        },
      ],
    },
    {
      image: `${projectImageBase}/mj_foodbank_IVR/IVR_Cover.png`,
      imageAlt: 'IVR phone booking cover image',
      title: 'IVR Phone + Text Booking System',
      description:
        'Full automated voice booking and SMS support so clients without internet can still schedule appointments.',
      tags: ['IVR', 'Voice', 'SMS'],
      status: 'Completed',
      gallery: [
        {
          src: `${projectImageBase}/mj_foodbank_IVR/Image (1).jpg`,
          alt: 'IVR call flow overview',
          description:
            'IVR call flow map that guides callers through booking prompts.',
        },
        {
          src: `${projectImageBase}/mj_foodbank_IVR/Image (2).jpg`,
          alt: 'SMS booking confirmation preview',
          description:
            'SMS confirmations and reminders for scheduled appointments.',
        },
        {
          src: `${projectImageBase}/mj_foodbank_IVR/Image (3).jpg`,
          alt: 'IVR admin tooling',
          description:
            'Admin tools for managing IVR scripts, routing, and call outcomes.',
        },
      ],
    },
  ]

  const upcomingProjects: Project[] = [
    {
      image:
        'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'City bus traveling through an urban corridor',
      title: 'Live Transit Route Finder',
      description:
        'Find the right bus service, see the nearest stop to board, and track vehicles in real time.',
      tags: ['Transit', 'Live Tracking', 'Routing'],
      status: 'Upcoming',
      gallery: [
        {
          src: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1200&q=80',
          alt: 'Bus lane with vehicles in motion',
          description:
            'Real-time map view with bus locations and nearby stops.',
        },
        {
          src: 'https://images.unsplash.com/photo-1505236731920-5f9a6e86d210?auto=format&fit=crop&w=1200&q=80',
          alt: 'Transit stop sign with arrivals information',
          description:
            'Route planning inputs paired with arrival predictions and ETAs.',
        },
        {
          src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
          alt: 'City street with buses and commuters',
          description:
            'Service alerts, stop-level details, and rider updates.',
        },
      ],
    },
  ]

  const allProjects = [...projects, ...upcomingProjects]

  const impactStats = [
    { value: `${projects.length}`, label: 'Projects featured' },
    { value: `${upcomingProjects.length}`, label: 'In the pipeline' },
    { value: 'Moose Jaw', label: 'Local delivery' },
  ]

  const blogPosts: BlogPost[] = []

  const process = [
    {
      step: '01',
      title: 'Map the workflow',
      description:
        'We document what happens today, where paper slows things down, and where automation helps most.',
    },
    {
      step: '02',
      title: 'Design and build',
      description:
        'We design the screens and build the system with clear milestones and weekly check-ins.',
    },
    {
      step: '03',
      title: 'Launch with support',
      description:
        'We ship, train your team, and iterate so the platform keeps getting better.',
    },
  ]

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Blog', href: '#/blog' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': { boxSizing: 'border-box' },
          body: {
            backgroundColor: 'var(--brand-sand)',
            backgroundImage:
              'radial-gradient(circle at top left, rgba(255,230,205,0.85) 0%, rgba(247,243,238,0.95) 38%, rgba(232,240,244,0.9) 100%), linear-gradient(120deg, rgba(255,255,255,0.9), rgba(245,239,230,0.6))',
            backgroundAttachment: 'fixed',
          },
          a: { color: 'inherit', textDecoration: 'none' },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-14px)' },
          },
          '@keyframes reveal': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0px)' },
          },
        }}
      />
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            top: -120,
            right: -160,
            width: 360,
            height: 360,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FFD1A8, transparent 70%)',
            transform: `translateY(${scrollY * 0.12}px)`,
            opacity: 0.7,
            pointerEvents: 'none',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -140,
            left: -120,
            width: 420,
            height: 420,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #B8D7E3, transparent 70%)',
            transform: `translateY(${scrollY * -0.08}px)`,
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />
        <AppBar
          position="sticky"
          color="transparent"
          elevation={0}
          sx={{
            bgcolor: 'rgba(247, 243, 238, 0.82)',
            backdropFilter: 'blur(12px)',
            color: 'text.primary',
            borderBottom: '1px solid rgba(15, 76, 92, 0.08)',
          }}
        >
          <Toolbar sx={{ gap: { xs: 1.5, md: 3 } }}>
            <LogoWordmark logoSize={{ xs: 112, sm: 136, md: 160 }} />
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navLinks.map((link) => (
                <Button key={link.href} color="inherit" component="a" href={link.href}>
                  {link.label}
                </Button>
              ))}
            </Stack>
            <PrimaryButton
              variant="contained"
              sx={{ ml: { xs: 'auto', md: 3 }, display: { xs: 'none', md: 'inline-flex' } }}
              href="#contact"
            >
              Start a Project
            </PrimaryButton>
            <IconButton
              color="inherit"
              aria-label="Open navigation menu"
              onClick={openMobileMenu}
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={closeMobileMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {navLinks.map((link) => (
                <MenuItem
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </MenuItem>
              ))}
            </Menu>
          </Toolbar>
        </AppBar>

        {page === 'home' && (
          <>
            <Section>
              <PageContainer>
                <Grid container spacing={{ xs: 3, md: 6 }} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      <Typography variant="h1">
                        Pixel Moose Digital Studio
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Moose Jaw has plenty of WordPress website shops. Pixel Moose Studio is
                        different: we build custom-coded applications that reduce paper, smooth
                        out admin work, and deliver Android + iOS apps many local firms do not offer.
                      </Typography>
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                        <PrimaryButton
                          variant="contained"
                          endIcon={<ArrowOutwardIcon />}
                          href="#work"
                        >
                          View Our Work
                        </PrimaryButton>
                        <GhostButton variant="outlined" href="#contact">
                          Schedule a Call
                        </GhostButton>
                      </Stack>
                      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                        {['Custom Web Apps', 'Workflow Automation', 'Android + iOS', 'Paperless Ops'].map((label) => (
                          <Chip
                            key={label}
                            label={label}
                            variant="outlined"
                            sx={{ borderRadius: 999 }}
                          />
                        ))}
                      </Stack>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <HeroGraphicPanel
                      sx={{
                        transform: {
                          xs: 'none',
                          md: `translateY(${scrollY * -0.08}px)`,
                        },
                      }}
                    >
                      <Stack spacing={2.5} sx={{ position: 'relative', zIndex: 1 }}>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <TagChip label="Workflow-first delivery" size="small" />
                          <Typography variant="overline" color="text.secondary">
                            Moose Jaw, SK
                          </Typography>
                        </Stack>
                        <Box
                          component="img"
                          src={heroGraphic}
                          alt="Abstract graphic illustrating a connected workflow"
                          sx={{
                            width: '100%',
                            height: { xs: 240, sm: 320, md: 360 },
                            objectFit: 'contain',
                            borderRadius: '20px',
                            boxShadow: '0 18px 40px rgba(24, 20, 16, 0.16)',
                            bgcolor: 'rgba(255,255,255,0.7)',
                            padding: { xs: 2, sm: 3 },
                          }}
                        />
                        <GlassCard
                          elevation={0}
                          sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2 }}
                        >
                          <IconBadge>
                            <BoltIcon fontSize="small" />
                          </IconBadge>
                          <Box>
                            <Typography variant="subtitle1" fontWeight={700}>
                              Modern, custom systems
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Clean dashboards, smart workflows, mobile-ready experiences.
                            </Typography>
                          </Box>
                        </GlassCard>
                      </Stack>
                    </HeroGraphicPanel>
                  </Grid>
                </Grid>
              </PageContainer>
            </Section>

            <Section>
              <PageContainer>
                <Grid container spacing={4}>
                  {[
                    { value: 'Custom', label: 'Built around your workflows' },
                    { value: 'Paperless', label: 'Less admin, fewer errors' },
                    { value: 'Mobile', label: 'Android + iOS ready' },
                  ].map((stat, index) => (
                    <Grid item xs={12} md={4} key={stat.label}>
                      <Box
                        sx={{
                          animation: 'reveal 0.8s ease both',
                          animationDelay: `${index * 0.12}s`,
                        }}
                      >
                        <StatCard value={stat.value} label={stat.label} />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </PageContainer>
            </Section>

            <WorkSection id="work">
              <PageContainer>
                <Stack spacing={{ xs: 4, md: 6 }}>
                  <Box sx={{ maxWidth: 720 }}>
                    <SectionTitle
                      kicker="Custom platforms that cut busywork."
                      title="Featured Work"
                      subtitle=""
                    />
                  </Box>
                  <GlassCard
                    elevation={0}
                    sx={{
                      display: 'grid',
                      gap: { xs: 3, md: 4 },
                      alignItems: 'center',
                      gridTemplateColumns: { xs: '1fr', md: '1.4fr 0.6fr' },
                      border: '1px solid rgba(239,108,47,0.25)',
                      boxShadow: '0 34px 80px rgba(239, 108, 47, 0.18)',
                    }}
                  >
                    <Stack spacing={2}>
                      <Typography variant="h3">
                        Projects that remove the paper pileup.
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Each build starts with the real workflow, then turns it into a clean,
                        searchable system the team can trust.
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {['Workflow-first', 'Ops dashboards', 'Mobile-ready', 'Custom integrations'].map((label) => (
                          <Chip
                            key={label}
                            label={label}
                            variant="outlined"
                            sx={{ borderRadius: 999 }}
                          />
                        ))}
                      </Stack>
                    </Stack>
                    <Stack spacing={2}>
                      {impactStats.map((stat) => (
                        <Box key={stat.label}>
                          <Typography variant="h4">{stat.value}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stat.label}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </GlassCard>
                  <Stack spacing={2}>
                    <Typography variant="h4">Projects</Typography>
                    <Grid container spacing={4}>
                      {allProjects.map((project, index) => (
                        <Grid item xs={12} md={6} key={project.title} sx={{ display: 'flex' }}>
                          <Box
                            sx={{
                              animation: 'reveal 0.8s ease both',
                              animationDelay: `${index * 0.15}s`,
                              flex: 1,
                              display: 'flex',
                            }}
                          >
                            <ProjectCard
                              {...project}
                              onOpen={() => openProjectGallery(project)}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Stack>
                </Stack>
              </PageContainer>
            </WorkSection>

            <Section id="services">
              <PageContainer>
                <Stack spacing={{ xs: 4, md: 6 }}>
                  <Box sx={{ maxWidth: 720 }}>
                    <SectionTitle
                      title="Services"
                      kicker="End-to-end delivery, no templates."
                      subtitle="We design, build, and launch the exact system your business needs, not a cookie-cutter site."
                    />
                  </Box>
                  <Grid container spacing={3}>
                    {services.map((service, index) => (
                      <Grid item xs={12} md={4} key={service.title}>
                        <Box
                          sx={{
                            animation: 'reveal 0.8s ease both',
                            animationDelay: `${index * 0.12}s`,
                          }}
                        >
                          <ServiceCard {...service} />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </PageContainer>
            </Section>

            <Section>
              <PageContainer>
                <Grid container spacing={{ xs: 3, md: 5 }}>
                  <Grid item xs={12} md={6}>
                    <GlassCard elevation={0} sx={{ height: '100%' }}>
                      <Stack spacing={3}>
                        <Box
                          component="img"
                          src={studioImage}
                          alt="Studio team collaborating around a table"
                          sx={{
                            width: '100%',
                            height: { xs: 180, sm: 220 },
                            objectFit: 'cover',
                            borderRadius: '20px',
                          }}
                        />
                        <TagChip label="Studio Culture" size="small" />
                        <Typography variant="h3">
                          Not just a website shop.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Pixel Moose Studio is a Moose Jaw-based team focused on digitizing
                          business operations. We build custom-coded software that removes paper,
                          smooths admin work, and keeps teams moving.
                        </Typography>
                        <Stack spacing={2}>
                          {[
                            { icon: <StorefrontIcon />, label: 'Moose Jaw based, built for real teams' },
                            { icon: <HandshakeIcon />, label: 'Hands-on discovery and delivery' },
                            { icon: <BoltIcon />, label: 'Paperless workflows, fast outcomes' },
                          ].map((item) => (
                            <Stack key={item.label} direction="row" spacing={2} alignItems="center">
                              <Box
                                component="span"
                                sx={{
                                  width: 46,
                                  height: 46,
                                  borderRadius: '50%',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: 'rgba(15, 76, 92, 0.12)',
                                  color: 'secondary.main',
                                }}
                              >
                                {item.icon}
                              </Box>
                              <Typography variant="body2">{item.label}</Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Stack>
                    </GlassCard>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                    height: '100%',
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  }}
                >
                  {[
                    { title: 'Workflow Mapping', detail: 'Clear steps from paper to digital' },
                    { title: 'Admin Dashboards', detail: 'Simple views for complex work' },
                    { title: 'Mobile Apps', detail: 'Android + iOS for staff and customers' },
                    { title: 'Custom Integrations', detail: 'Connect tools without spreadsheets' },
                  ].map((item, index) => (
                    <GlassCard
                      key={item.title}
                      elevation={0}
                      sx={{
                        animation: 'float 6s ease-in-out infinite',
                        animationDelay: `${index * 0.6}s`,
                      }}
                    >
                      <Stack spacing={1}>
                        <Typography variant="h5">{item.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.detail}
                        </Typography>
                      </Stack>
                    </GlassCard>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </PageContainer>
        </Section>

        <Section id="process">
          <PageContainer>
            <Stack spacing={{ xs: 4, md: 6 }}>
              <Box sx={{ maxWidth: 720 }}>
                <SectionTitle
                  kicker="Practical delivery from discovery to launch"
                  title="Process"
                  subtitle="We keep stakeholders aligned and focus on removing friction from daily operations."
                />
              </Box>
              <Grid container spacing={3}>
                {process.map((step, index) => (
                  <Grid item xs={12} md={4} key={step.step}>
                    <Box
                      sx={{
                        animation: 'reveal 0.8s ease both',
                        animationDelay: `${index * 0.15}s`,
                      }}
                    >
                      <ProcessStep {...step} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </PageContainer>
        </Section>

        <Section id="contact">
          <PageContainer>
            <GlassCard elevation={0}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={8}>
                  <Stack spacing={2}>
                    <TagChip label="Ready to Build?" size="small" />
                    <Typography variant="h3">
                      Ready to go paperless?
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Tell us about your workflow, and we will design a custom system that
                      streamlines admin work and delivers the mobile tools your team needs.
                      We are email-only right now, so send details and we will reply quickly.
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={2}>
                    <PrimaryButton
                      variant="contained"
                      endIcon={<ArrowOutwardIcon />}
                      href="mailto:pixelmoose.development@gmail.com"
                    >
                      Email Pixel Moose
                    </PrimaryButton>
                    <GhostButton
                      variant="outlined"
                      href="mailto:pixelmoose.development@gmail.com"
                    >
                      pixelmoose.development@gmail.com
                    </GhostButton>
                  </Stack>
                </Grid>
              </Grid>
            </GlassCard>
          </PageContainer>
        </Section>
          </>
        )}

        {page === 'blog' && (
          <Section>
            <PageContainer>
              <Stack spacing={{ xs: 4, md: 6 }}>
                <Box sx={{ maxWidth: 720 }}>
                  <SectionTitle
                    kicker="Notes from the studio"
                    title="Blog"
                    subtitle="Thoughts on digitizing operations, product, and workflow automation."
                  />
                </Box>
                {blogPosts.length > 0 ? (
                  <Grid container spacing={3}>
                    {blogPosts.map((post, index) => (
                      <Grid item xs={12} md={4} key={post.id}>
                        <Box
                          sx={{
                            animation: 'reveal 0.8s ease both',
                            animationDelay: `${index * 0.12}s`,
                          }}
                        >
                          <GlassCard elevation={0} sx={{ height: '100%' }}>
                            <Stack spacing={2}>
                              <TagChip label={post.date} size="small" />
                              <Typography variant="h5">{post.title}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {post.summary}
                              </Typography>
                              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {post.tags.map((tag) => (
                                  <Chip
                                    key={`${post.id}-${tag}`}
                                    label={tag}
                                    size="small"
                                    sx={{ borderRadius: 999 }}
                                  />
                                ))}
                              </Stack>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <PrimaryButton
                                  variant="contained"
                                  size="small"
                                  onClick={() => openBlogPost(post)}
                                >
                                  Read article
                                </PrimaryButton>
                                {post.readTime && (
                                  <Typography variant="caption" color="text.secondary">
                                    {post.readTime}
                                  </Typography>
                                )}
                              </Stack>
                            </Stack>
                          </GlassCard>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <GlassCard elevation={0}>
                    <Typography variant="h5">No posts yet.</Typography>
                  </GlassCard>
                )}
              </Stack>
            </PageContainer>
          </Section>
        )}
        <Box
          component="footer"
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(15, 76, 92, 0.12)',
            background:
              'linear-gradient(180deg, rgba(248,238,230,0.9) 0%, rgba(255,255,255,0.96) 100%)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: -120,
              right: -140,
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(239,108,47,0.2), transparent 70%)',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -120,
              left: -100,
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(15,76,92,0.2), transparent 70%)',
              opacity: 0.6,
              pointerEvents: 'none',
            }}
          />
          <PageContainer sx={{ py: { xs: 6, md: 8 }, position: 'relative', zIndex: 1 }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={5}>
                <Stack spacing={2}>
                  <LogoWordmark logoSize={{ xs: 96, sm: 120, md: 140 }} />
                  <Typography variant="body2" color="text.secondary">
                    Pixel Moose Studio designs and builds custom systems that remove paper,
                    reduce admin friction, and keep teams moving.
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Button
                      variant="outlined"
                      size="small"
                      href="mailto:pixelmoose.development@gmail.com"
                      sx={{ borderRadius: 999 }}
                    >
                      Email us
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<FacebookIcon fontSize="small" />}
                      href="https://www.facebook.com/share/17yZcLzNJ1/?mibextid=wwXIfr"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ borderRadius: 999 }}
                    >
                      Facebook
                    </Button>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Stack spacing={1.5}>
                  <Typography variant="h6">Explore</Typography>
                  {[
                    { label: 'Work', href: '#work' },
                    { label: 'Services', href: '#services' },
                    { label: 'Process', href: '#process' },
                    { label: 'Blog', href: '#/blog' },
                    { label: 'Contact', href: '#contact' },
                  ].map((link) => (
                    <Button
                      key={link.href}
                      href={link.href}
                      color="inherit"
                      sx={{ justifyContent: 'flex-start', px: 0, width: 'fit-content' }}
                    >
                      {link.label}
                    </Button>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Stack spacing={1.5}>
                  <Typography variant="h6">Studio</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Moose Jaw, Saskatchewan
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Email-only for now. We reply within one business day.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    href="mailto:pixelmoose.development@gmail.com"
                    sx={{ borderRadius: 999, width: 'fit-content' }}
                  >
                    pixelmoose.development@gmail.com
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            <Box
              sx={{
                mt: { xs: 4, md: 6 },
                pt: 2,
                borderTop: '1px solid rgba(15, 76, 92, 0.12)',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1,
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="caption" color="text.secondary">
                © {new Date().getFullYear()} Pixel Moose Studio. All rights reserved.
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Built for modern teams who want to go paperless.
              </Typography>
            </Box>
          </PageContainer>
        </Box>
        <Dialog
          open={Boolean(selectedProject)}
          onClose={closeProjectGallery}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5">
                  {selectedProject?.title ?? 'Project Gallery'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedProject?.description ?? 'Project image carousel.'}
                </Typography>
              </Box>
              <IconButton aria-label="Close project gallery" onClick={closeProjectGallery}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {selectedProject && selectedProject.gallery.length > 0 && (
              <Stack spacing={3}>
                <Box
                  sx={{
                    borderRadius: '20px',
                    border: '1px solid rgba(15, 76, 92, 0.2)',
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,238,230,0.8))',
                    padding: { xs: 2, sm: 3 },
                    position: 'relative',
                  }}
                >
                  {selectedProject.gallery[activeImageIndex].src ? (
                    <Box
                      onTouchStart={handlePinchStart}
                      onTouchMove={handlePinchMove}
                      onTouchEnd={handlePinchEnd}
                      onTouchCancel={handlePinchEnd}
                      sx={{
                        width: '100%',
                        height: { xs: 280, sm: 360 },
                        borderRadius: '20px',
                        overflow: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(255,255,255,0.75)',
                        touchAction: 'pinch-zoom',
                      }}
                    >
                      <Box
                        component="img"
                        src={selectedProject.gallery[activeImageIndex].src}
                        alt={selectedProject.gallery[activeImageIndex].alt}
                        sx={{
                          width: `${zoomLevel * 100}%`,
                          height: `${zoomLevel * 100}%`,
                        maxWidth: 'none',
                        maxHeight: 'none',
                        objectFit: 'contain',
                        borderRadius: '20px',
                        boxShadow: '0 18px 40px rgba(15, 76, 92, 0.16)',
                      }}
                    />
                  </Box>
                  ) : (
                    <Box
                      sx={{
                        width: '100%',
                        height: { xs: 280, sm: 360 },
                        borderRadius: '20px',
                        border: '1px dashed rgba(15, 76, 92, 0.35)',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant="overline" color="text.secondary">
                        Add project image
                      </Typography>
                    </Box>
                  )}
                  <IconButton
                    aria-label="Previous image"
                    onClick={goToPreviousImage}
                    disabled={selectedProject.gallery.length <= 1}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: { xs: 8, sm: 16 },
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(15, 76, 92, 0.15)',
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Next image"
                    onClick={goToNextImage}
                    disabled={selectedProject.gallery.length <= 1}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: { xs: 8, sm: 16 },
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(255,255,255,0.9)',
                      border: '1px solid rgba(15, 76, 92, 0.15)',
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: 999,
                      border: '1px solid rgba(15, 76, 92, 0.15)',
                      padding: '4px 8px',
                    }}
                  >
                    <IconButton aria-label="Zoom out" size="small" onClick={handleZoomOut}>
                      <ZoomOutIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" sx={{ minWidth: 46, textAlign: 'center' }}>
                      {Math.round(zoomLevel * 100)}%
                    </Typography>
                    <IconButton aria-label="Zoom in" size="small" onClick={handleZoomIn}>
                      <ZoomInIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="Reset zoom"
                      size="small"
                      onClick={handleZoomReset}
                    >
                      <RestartAltIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Box>
                <Stack spacing={1}>
                  <Typography variant="overline" color="text.secondary">
                    Image {activeImageIndex + 1} of {selectedProject.gallery.length}
                  </Typography>
                  <Typography variant="body1">
                    {selectedProject.gallery[activeImageIndex].description}
                  </Typography>
                </Stack>
              </Stack>
            )}
          </DialogContent>
        </Dialog>
        <Dialog
          open={Boolean(selectedBlogPost)}
          onClose={closeBlogPost}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5">
                  {selectedBlogPost?.title ?? 'Blog Post'}
                </Typography>
                <Stack direction="row" spacing={1.5} alignItems="center">
                  {selectedBlogPost?.date && (
                    <Typography variant="body2" color="text.secondary">
                      {selectedBlogPost.date}
                    </Typography>
                  )}
                  {selectedBlogPost?.readTime && (
                    <TagChip label={selectedBlogPost.readTime} size="small" />
                  )}
                </Stack>
              </Box>
              <IconButton aria-label="Close blog post" onClick={closeBlogPost}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            {blogLoading && (
              <Typography variant="body2" color="text.secondary">
                Loading Word document...
              </Typography>
            )}
            {blogError && (
              <Typography variant="body2" color="error">
                {blogError}
              </Typography>
            )}
            {!blogLoading && !blogError && (
              <>
                {blogHtml ? (
                  <Box
                    className="blog-content"
                    sx={{
                      '& h1, & h2, & h3': {
                        fontFamily: '"Fraunces", serif',
                        fontWeight: 700,
                        marginTop: 2.5,
                        marginBottom: 1,
                      },
                      '& p': { marginBottom: 2 },
                      '& strong': { fontWeight: 700 },
                      '& em': { fontStyle: 'italic' },
                      '& ul, & ol': { paddingLeft: 3, marginBottom: 2 },
                      '& li': { marginBottom: 1 },
                      '& blockquote': {
                        borderLeft: '3px solid rgba(15, 76, 92, 0.3)',
                        paddingLeft: 2,
                        color: 'text.secondary',
                        marginBottom: 2,
                      },
                      '& img': {
                        maxWidth: '100%',
                        borderRadius: '16px',
                        boxShadow: '0 14px 30px rgba(15, 76, 92, 0.15)',
                        marginBottom: 2,
                      },
                    }}
                    dangerouslySetInnerHTML={{ __html: blogHtml }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    This Word document does not contain readable content yet.
                  </Typography>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  )
}

export default App
