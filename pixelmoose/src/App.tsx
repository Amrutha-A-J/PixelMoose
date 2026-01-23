import { useEffect, useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import {
  AppBar,
  Box,
  Button,
  Chip,
  Container,
  CssBaseline,
  Grid,
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
import HandshakeIcon from '@mui/icons-material/Handshake'
import LayersIcon from '@mui/icons-material/Layers'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import StorefrontIcon from '@mui/icons-material/Storefront'

const LogoLockup = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.75),
}))

const LogoWordmark = ({
  logoSize = 56,
}: {
  logoSize?: number
}) => (
  <LogoLockup>
    <Box
      component="img"
      src="/images/Logo/PixelMoose_logo.png"
      alt="Pixel Moose logo"
      sx={{ width: logoSize, height: logoSize }}
    />
  </LogoLockup>
)

const GlassCard = styled(Paper)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(3.5),
  border: '1px solid rgba(255,255,255,0.6)',
  background: 'linear-gradient(140deg, rgba(255,255,255,0.88), rgba(255,255,255,0.55))',
  boxShadow: '0 24px 60px rgba(13, 17, 23, 0.12)',
  backdropFilter: 'blur(14px)',
}))

const TagChip = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  fontWeight: 600,
  letterSpacing: '0.02em',
  border: '1px solid rgba(38, 42, 47, 0.12)',
  backgroundColor: theme.palette.common.white,
}))

const IconBadge = styled('span')(({ theme }) => ({
  width: 54,
  height: 54,
  borderRadius: '50%',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(239, 108, 47, 0.12)',
  color: theme.palette.primary.main,
}))

const PrimaryButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  padding: theme.spacing(1.3, 3.5),
  fontWeight: 700,
  textTransform: 'none',
  boxShadow: '0 16px 40px rgba(239, 108, 47, 0.35)',
}))

const GhostButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  padding: theme.spacing(1.3, 3.5),
  fontWeight: 700,
  textTransform: 'none',
  border: '1px solid rgba(38, 42, 47, 0.2)',
}))

const Section = styled('section')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(14, 0),
  },
}))

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
    <TagChip label={kicker} size="small" />
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
  title,
  description,
  tags,
}: {
  title: string
  description: string
  tags: string[]
}) => (
  <GlassCard elevation={0}>
    <Stack spacing={2.5}>
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
    </Stack>
  </GlassCard>
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
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2.6rem, 3.5vw, 4.4rem)',
            lineHeight: 1.05,
          },
          h2: {
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 2.4vw, 3.1rem)',
          },
          h3: {
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 2vw, 2.3rem)',
          },
          h5: {
            fontWeight: 700,
            fontSize: '1.15rem',
          },
          body1: {
            fontSize: '1.05rem',
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
        },
      }),
    [],
  )

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

  const projects = [
    {
      title: 'Paperless Intake System',
      description:
        'Digitized intake and approvals that replace paper forms and cut down on manual follow-ups.',
      tags: ['Workflow', 'Automation', 'Web App'],
    },
    {
      title: 'Admin Command Center',
      description:
        'Unified dashboards for tasks, records, and reporting so teams can move faster.',
      tags: ['Admin', 'Operations', 'Reporting'],
    },
    {
      title: 'Android + iOS Companion App',
      description:
        'Mobile tools for staff and customers to access services without a desktop.',
      tags: ['Mobile', 'Android', 'iOS'],
    },
  ]

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          '*': { boxSizing: 'border-box' },
          body: {
            background:
              'radial-gradient(circle at top left, #F9EFE3 0%, #F7F3EE 35%, #F2F6F8 100%)',
          },
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
            bgcolor: 'rgba(247, 243, 238, 0.75)',
            backdropFilter: 'blur(12px)',
            color: 'text.primary',
          }}
        >
          <Toolbar>
            <LogoWordmark logoSize={58} />
            <Box sx={{ flexGrow: 1 }} />
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button color="inherit" component="a" href="#work">
                Work
              </Button>
              <Button color="inherit" component="a" href="#services">
                Services
              </Button>
              <Button color="inherit" component="a" href="#process">
                Process
              </Button>
              <Button color="inherit" component="a" href="#contact">
                Contact
              </Button>
            </Stack>
            <PrimaryButton
              variant="contained"
              sx={{ ml: { xs: 'auto', md: 3 } }}
              component="a"
              href="#contact"
            >
              Start a Project
            </PrimaryButton>
          </Toolbar>
        </AppBar>

        <Section>
          <Container>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  <TagChip label="Moose Jaw Digital Studio" size="small" />
                  <Typography variant="h1">
                    Digitize your business with custom software and mobile apps.
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Moose Jaw has plenty of WordPress website shops. Pixel Moose Studio is
                    different: we build custom-coded applications that reduce paper, smooth
                    out admin work, and deliver Android + iOS apps many local firms do not offer.
                  </Typography>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <PrimaryButton variant="contained" endIcon={<ArrowOutwardIcon />}>
                      View Our Work
                    </PrimaryButton>
                    <GhostButton variant="outlined">Schedule a Call</GhostButton>
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
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: 32,
                    overflow: 'hidden',
                    padding: { xs: 3, md: 4 },
                    background:
                      'linear-gradient(150deg, rgba(255,255,255,0.9), rgba(255,255,255,0.55))',
                    border: '1px solid rgba(255,255,255,0.7)',
                    boxShadow: '0 24px 70px rgba(24, 20, 16, 0.18)',
                    transform: `translateY(${scrollY * -0.1}px)`,
                  }}
                >
                  <Stack spacing={3}>
                    <LogoWordmark logoSize={82} />
                    <Typography variant="h5">
                      Replace paper with a system your team actually enjoys.
                    </Typography>
                    <Stack spacing={2}>
                      {[
                        'Paperless forms, approvals, and records',
                        'Admin dashboards that keep work flowing',
                        'Android + iOS apps for on-the-go teams',
                      ].map((item) => (
                        <Stack key={item} direction="row" spacing={2} alignItems="center">
                          <Box
                            component="span"
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: '50%',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              bgcolor: 'rgba(15, 76, 92, 0.12)',
                              color: 'secondary.main',
                            }}
                          >
                            <BoltIcon fontSize="small" />
                          </Box>
                          <Typography variant="body2">{item}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container>
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
          </Container>
        </Section>

        <Section id="work">
          <Container>
            <Grid container spacing={6}>
              <Grid item xs={12} md={5}>
                <SectionTitle
                  kicker="Featured Work"
                  title="Custom platforms that cut busywork."
                  subtitle="From intake systems to mobile apps, we design and build tools that make operations smoother and more efficient."
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Stack spacing={3}>
                  {projects.map((project, index) => (
                    <Box
                      key={project.title}
                      sx={{
                        animation: 'reveal 0.8s ease both',
                        animationDelay: `${index * 0.15}s`,
                      }}
                    >
                      <ProjectCard {...project} />
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Section>

        <Section id="services">
          <Container>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={4}>
                <SectionTitle
                  kicker="Capabilities"
                  title="End-to-end delivery, no templates."
                  subtitle="We design, build, and launch the exact system your business needs, not a cookie-cutter site."
                />
              </Grid>
              <Grid item xs={12} md={8}>
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
              </Grid>
            </Grid>
          </Container>
        </Section>

        <Section>
          <Container>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <GlassCard elevation={0} sx={{ height: '100%' }}>
                  <Stack spacing={3}>
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
          </Container>
        </Section>

        <Section id="process">
          <Container>
            <Grid container spacing={6}>
              <Grid item xs={12} md={4}>
                <SectionTitle
                  kicker="Process"
                  title="Practical delivery from discovery to launch."
                  subtitle="We keep stakeholders aligned and focus on removing friction from daily operations."
                />
              </Grid>
              <Grid item xs={12} md={8}>
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
              </Grid>
            </Grid>
          </Container>
        </Section>

        <Section id="contact">
          <Container>
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
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack spacing={2}>
                    <PrimaryButton variant="contained" endIcon={<ArrowOutwardIcon />}>
                      Book a Discovery Call
                    </PrimaryButton>
                    <GhostButton variant="outlined">hello@pixelmoose.studio</GhostButton>
                  </Stack>
                </Grid>
              </Grid>
            </GlassCard>
          </Container>
        </Section>
      </Box>
    </ThemeProvider>
  )
}

export default App
