import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { API_BASE_URL, BASIC_AUTH_HEADER } from '../../constants/Auth';

// Types based on provided Django model and expected API enrichments
type Artist = {
	id: number;
	name: string;
	// ...other artist fields...
};

type GenreDTO = {
	id: number;
	name: string;
	description?: string | null;
	genre_image?: string | null;
	parent_genre?: number | null;
	subgenres?: GenreDTO[]; // nested
	artists?: Artist[]; // optional list of artists for the genre
	artists_count?: number; // optional precomputed metric from backend
	gigs_attended_count?: number; // optional precomputed metric
};

export default function GenresView() {
	const [genres, setGenres] = useState<GenreDTO[]>([]);
	const [expanded, setExpanded] = useState<Record<number, boolean>>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function load() {
			setLoading(true);
			setError(null);
			// Try a set of likely endpoints until one works
			const endpoints = [
				`${API_BASE_URL}/api/genres?parents=true`,
				`${API_BASE_URL}/api/genres/?parents=true`,
				`${API_BASE_URL}/api/genres`,
				`${API_BASE_URL}/api/genres/`,
			];

			let lastErr: Error | null = null;
			for (const ep of endpoints) {
				try {
					const res = await fetch(ep, {
						headers: {
							'Authorization': BASIC_AUTH_HEADER,
							'Content-Type': 'application/json',
						},
					});
					if (!res.ok) {
						lastErr = new Error(`Failed to load genres (${res.status}) at ${ep}`);
						if (res.status === 404) {
							continue;
						}
						throw lastErr;
					}
					const data: GenreDTO[] = await res.json();
					setGenres(data);
					setLoading(false);
					return;
				} catch (e: any) {
					lastErr = e instanceof Error ? e : new Error(String(e));
				}
			}

			setError(lastErr ? `${lastErr.message}` : "Failed to load genres");
			setLoading(false);
		}
		load();
	}, []);

	function toggleExpand(id: number) {
		setExpanded((s) => ({ ...s, [id]: !s[id] }));
	}

	function goToArtist(id: number) {
		require('expo-router').useRouter().push(`/artist-detail/${id}`);
	}

	function goToGenreArtists(genreName: string) {
		// Navigate to artists tab with genre filter
		// Using router.push with query params
		const router = require('expo-router').useRouter();
		router.push({
			pathname: '/(tabs)/artists',
			params: { genre: genreName, showDetailed: 'true' }
		});
	}

	if (loading) return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color="#EA4949" style={{ marginTop: 40 }} />
		</View>
	);
	
	if (error) return (
		<View style={styles.container}>
			<Text style={styles.errorText}>Error: {error}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
				<Text style={styles.title}>Genres</Text>
				<View style={styles.spacer} />

				{/* Grid of parent genre cards */}
				{genres.map((g) => {
					const artistsCount = g.artists_count ?? (g.artists ? g.artists.length : 0);
					const gigsCount = g.gigs_attended_count ?? 0;
					const isEmpty = artistsCount === 0 && gigsCount === 0;
					return (
						<View key={g.id} style={[styles.card, styles.genreCard, isEmpty && { opacity: 0.5 }]}>
							<TouchableOpacity style={styles.cardInner} onPress={() => toggleExpand(g.id)}>
								{g.genre_image ? (
									<Image source={{ uri: g.genre_image }} style={styles.thumb} />
								) : (
									<View style={styles.thumbPlaceholder}>
										<Text style={styles.thumbPlaceholderText}>{g.name.slice(0, 1)}</Text>
									</View>
								)}
								<View style={styles.cardBody}>
									<Text style={styles.cardTitle}>{g.name}</Text>
									<Text style={styles.cardDesc} numberOfLines={2}>
										{g.description || "No description"}
									</Text>
									<View style={styles.metricsRow}>
										<Text style={styles.metric}>Artists: <Text style={styles.metricBold}>{artistsCount}</Text></Text>
										<Text style={styles.metric}>Gigs: <Text style={styles.metricBold}>{gigsCount}</Text></Text>
									</View>
								</View>
								<Ionicons 
									name={expanded[g.id] ? "chevron-up" : "chevron-down"} 
									size={24} 
									color="#666" 
								/>
							</TouchableOpacity>

							{expanded[g.id] && (
								<View style={styles.subListWrap}>
									{(g.subgenres && g.subgenres.length > 0) ? (
										<>
											{/* Attended subgenres - vertical list */}
											{g.subgenres.filter(s => {
												const sArtistsCount = s.artists_count ?? (s.artists ? s.artists.length : 0);
												const sGigs = s.gigs_attended_count ?? 0;
												return sArtistsCount > 0 || sGigs > 0;
											}).length > 0 && (
												<View style={styles.subList}>
													{g.subgenres.filter(s => {
														const sArtistsCount = s.artists_count ?? (s.artists ? s.artists.length : 0);
														const sGigs = s.gigs_attended_count ?? 0;
														return sArtistsCount > 0 || sGigs > 0;
													}).map((s) => {
														const sArtistsCount = s.artists_count ?? (s.artists ? s.artists.length : 0);
														const sGigs = s.gigs_attended_count ?? 0;
														return (
															<TouchableOpacity 
																key={s.id} 
																style={styles.subItem}
																onPress={() => goToGenreArtists(s.name)}
															>
																<View style={styles.subInfo}>
																	<Text style={styles.subTitle}>{s.name}</Text>
																	{s.description && (
																		<Text style={styles.subDesc} numberOfLines={2}>{s.description}</Text>
																	)}
																	<View style={styles.subMetrics}>
																		<Text style={styles.metric}>
																			Artists: <Text style={styles.metricBold}>{sArtistsCount}</Text>
																		</Text>
																		<Text style={[styles.metric, { marginLeft: 12 }]}>
																			Gigs: <Text style={styles.metricBold}>{sGigs}</Text>
																		</Text>
																	</View>
																	{(s.artists && s.artists.length > 0) && (
																		<View style={styles.artistList}>
																			{s.artists.map((a) => (
																				<TouchableOpacity 
																					key={a.id} 
																					onPress={() => goToArtist(a.id)} 
																					style={styles.artistBtn}
																				>
																					<Text style={styles.artistBtnText}>{a.name}</Text>
																				</TouchableOpacity>
																			))}
																		</View>
																	)}
																</View>
																{s.genre_image && (
																	<Image source={{ uri: s.genre_image }} style={styles.subThumb} />
																)}
															</TouchableOpacity>
														);
													})}
												</View>
											)}

											{/* Unattended subgenres - faded pills */}
											{g.subgenres.filter(s => {
												const sArtistsCount = s.artists_count ?? (s.artists ? s.artists.length : 0);
												const sGigs = s.gigs_attended_count ?? 0;
												return sArtistsCount === 0 && sGigs === 0;
											}).length > 0 && (
												<View style={styles.unattendedSection}>
													<Text style={styles.unattendedLabel}>Not attended yet:</Text>
													<View style={styles.pillContainer}>
														{g.subgenres.filter(s => {
															const sArtistsCount = s.artists_count ?? (s.artists ? s.artists.length : 0);
															const sGigs = s.gigs_attended_count ?? 0;
															return sArtistsCount === 0 && sGigs === 0;
														}).map((s) => (
															<TouchableOpacity 
																key={s.id} 
																style={styles.fadedPill}
																onPress={() => goToGenreArtists(s.name)}
															>
																<Text style={styles.fadedPillText}>{s.name}</Text>
															</TouchableOpacity>
														))}
													</View>
												</View>
											)}
										</>
									) : (
										<Text style={styles.noSub}>No subgenres available.</Text>
									)}
								</View>
							)}
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		backgroundColor: '#F7F8FA', 
		padding: 18 
	},
	title: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#0B1533',
		marginBottom: 0,
		textAlign: 'left',
		letterSpacing: -0.5,
		marginTop: 0,
	},
	spacer: { height: 18 },
	card: {
		backgroundColor: '#fff',
		borderRadius: 14,
		shadowColor: '#011030',
		shadowOpacity: 0.07,
		shadowRadius: 6,
		shadowOffset: { width: 0, height: 2 },
		elevation: 2,
		marginBottom: 16,
	},
	genreCard: {
		overflow: 'hidden',
	},
	cardInner: { 
		flexDirection: 'row', 
		gap: 12, 
		padding: 14, 
		alignItems: 'center' 
	},
	thumb: { 
		width: 64, 
		height: 64, 
		borderRadius: 8 
	},
	thumbPlaceholder: { 
		width: 64, 
		height: 64, 
		backgroundColor: '#f0f0f0', 
		borderRadius: 8, 
		alignItems: 'center', 
		justifyContent: 'center' 
	},
	thumbPlaceholderText: {
		color: '#888',
		fontWeight: '700',
		fontSize: 24,
	},
	cardBody: { 
		flex: 1 
	},
	cardTitle: { 
		fontWeight: '700', 
		color: '#0B1533', 
		fontSize: 16 
	},
	cardDesc: { 
		fontSize: 13, 
		color: '#666', 
		marginTop: 6 
	},
	metricsRow: { 
		marginTop: 10, 
		flexDirection: 'row', 
		gap: 18 
	},
	metric: {
		fontSize: 13,
		color: '#666',
	},
	metricBold: {
		fontWeight: '700',
		color: '#0B1533',
	},
	subListWrap: { 
		borderTopWidth: 1, 
		borderTopColor: '#F2F6FB', 
		padding: 12, 
		backgroundColor: '#fafafa' 
	},
	subList: {},
	subItem: { 
		paddingVertical: 10, 
		borderBottomWidth: 1, 
		borderBottomColor: '#f0f0f0', 
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center' 
	},
	subInfo: { 
		flex: 1 
	},
	subTitle: { 
		fontWeight: '600', 
		color: '#0B1533',
		fontSize: 15,
	},
	subDesc: { 
		fontSize: 12, 
		color: '#666', 
		marginTop: 4 
	},
	subMetrics: { 
		marginTop: 8, 
		flexDirection: 'row',
	},
	artistList: { 
		marginTop: 8, 
		flexDirection: 'row', 
		flexWrap: 'wrap', 
		gap: 8 
	},
	artistBtn: { 
		paddingHorizontal: 8,
		paddingVertical: 6, 
		borderRadius: 6, 
		borderWidth: 1, 
		borderColor: '#E94F4F', 
		backgroundColor: '#fff' 
	},
	artistBtnText: {
		color: '#E94F4F',
		fontSize: 13,
		fontWeight: '600',
	},
	subThumb: { 
		width: 56, 
		height: 56, 
		borderRadius: 6, 
		marginLeft: 12 
	},
	noSub: { 
		padding: 8, 
		color: '#666',
		textAlign: 'center',
	},
	errorText: { 
		padding: 20, 
		color: '#EA4949',
		textAlign: 'center',
	},
	unattendedSection: {
		marginTop: 12,
		paddingTop: 12,
		borderTopWidth: 1,
		borderTopColor: '#f0f0f0',
	},
	unattendedLabel: {
		fontSize: 12,
		color: '#888',
		fontWeight: '600',
		marginBottom: 8,
	},
	pillContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	fadedPill: {
		backgroundColor: '#f5f5f5',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
		opacity: 0.6,
	},
	fadedPillText: {
		fontSize: 12,
		color: '#666',
		fontWeight: '500',
	},
});