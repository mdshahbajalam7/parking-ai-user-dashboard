/* eslint-disable */
import React from 'react'
import { Card, CardContent, Divider, Grid, Skeleton, Typography } from '@mui/material';

export default function CardSkeleton({ count = 4 }) {
    return (
        <Grid container spacing={3}>
            {[...Array(count)].map((_, idx) => (
                <Grid item xs={12} md={6} key={idx}>
                    <Card elevation={3} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <CardContent
                            sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom>
                                <Skeleton width="40%" height={30} />
                            </Typography>
                            <Divider sx={{ mb: 2 }} />
                            {[1, 2, 3].map((_, i) => (
                                <Skeleton key={i} height={20} width={`${80 - i * 10}%`} sx={{ mb: 1 }} />
                            ))}
                        </CardContent>
                    </Card>
                </Grid>
            ))}

            {/* Prescription Image Skeleton */}
            <Grid item xs={12}>
                <Card elevation={3}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            <Skeleton width="30%" height={30} />
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    );
}
