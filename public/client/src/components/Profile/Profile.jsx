import React from 'react'
import './css/index.css'

function Profile() {
	return (
		<div className='profile'>
			<div className='wrapper'>
				<div className='info'>
					<div className='profile-image'></div>
					<div className='profile-desc'>
						<div className='nickname txt-bold'>
							ZEMONG
						</div>
						{
							false ? (<div className="quote"><textarea placeholder='자신의 한줄평을 입력해주세요'></textarea></div>) : (<>
								<div className='quote'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero animi temporibus doloremque nobis! Aliquid nesciunt eum facere deserunt, facilis quibusdam sequi ratione deleniti cupiditate. Corrupti aut labore officiis perferendis atque?</div>
								<div className='follow-btn txt-bold'>팔로우하기</div>
							</>)}
					</div>
				</div>
				<div className='feed-images'>
					<div className="feed-image">
						<img src='https://c4.wallpaperflare.com/wallpaper/500/442/354/outrun-vaporwave-hd-wallpaper-thumb.jpg' alt='' />
					</div>
					<div className="feed-image">
						<img src='https://t4.ftcdn.net/jpg/03/62/39/57/360_F_362395740_s9dfMzdT2ZtgYvvqmy1XerekIHtEIEH1.jpg' alt='' />
					</div>
					<div className="feed-image">
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz4IiS2mqx3nKjHh1TZFTjHEN8r3Ltpvlnmg&usqp=CAU' alt='' />
					</div>
					<div className="feed-image">
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnY6ML8-yTbLPw8qbp_aAMWlgB-4lQIb4_Jw&usqp=CAU' alt='' />
					</div>
					<div className="feed-image">
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP4Gc6rNmaL0PwmKpjTKZ--nj32RfM5va5Ng&usqp=CAU' alt='' />
					</div>
					<div className="feed-image">
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5wkjfOoWrihD64SfiLB10D6eJQ042o4C01A&usqp=CAU' alt='' />
					</div>
					<div className="feed-image">
						<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYh5O2Lo102yb1Zfb-pONoT4VQW14Z7xuGQg&usqp=CAU' alt='' />
					</div>
				</div>
				<div className='profile-contents'>
					<div className='feed-list'>
						<div className='title txt-bold'>작성한 글</div>
						<div className='feeds'>
							<div className="feed">
								<div className="top">
									<div className="profile-image"></div>
									<div className="profile-desc">
										<div className="nickname txt-bold">ZEMONG</div>
										<div className="timestamp">8:15 pm, yesterday</div>
									</div>
								</div>
								<div className="contents">
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto debitis facere,
									corrupi consectetur soluta sit minima harum aspernatur. Rerum, nulla nisi laudantium
									quae obcaecati dolorum ullam saepe eos in voluptates?
								</div>
								<div className="bottom">
									<div className="like">
										<div className="asset">
											<img src="/assets/feed/like-dac.svg" alt="좋아요" />
										</div>
										<div className="count txt-bold">25k</div>
									</div>
									<div className="comment">
										<div className="asset">
											<img src="/assets/feed/comment.svg" alt="댓글" />
										</div>
										<div className="count txt-bold">2k</div>
									</div>
								</div>
							</div>
							<div className="feed">
								<div className="top">
									<div className="profile-image"></div>
									<div className="profile-desc">
										<div className="nickname txt-bold">ZEMONG</div>
										<div className="timestamp">8:15 pm, yesterday</div>
									</div>
								</div>
								<div className="contents">
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto debitis facere,
									corrupi consectetur soluta sit minima harum aspernatur. Rerum, nulla nisi laudantium
									quae obcaecati dolorum ullam saepe eos in voluptates?
									<div className="image"></div>
								</div>
								<div className="bottom">
									<div className="like">
										<div className="asset">
											<img src="/assets/feed/like-dac.svg" alt="좋아요" />
										</div>
										<div className="count txt-bold">25k</div>
									</div>
									<div className="comment">
										<div className="asset">
											<img src="/assets/feed/comment.svg" alt="댓글" />
										</div>
										<div className="count txt-bold">2k</div>
									</div>
								</div>
							</div>
							<div className="feed">
								<div className="top">
									<div className="profile-image"></div>
									<div className="profile-desc">
										<div className="nickname txt-bold">ZEMONG</div>
										<div className="timestamp">8:15 pm, yesterday</div>
									</div>
								</div>
								<div className="contents">
									Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto debitis facere,
									corrupi consectetur soluta sit minima harum aspernatur. Rerum, nulla nisi laudantium
									quae obcaecati dolorum ullam saepe eos in voluptates?
								</div>
								<div className="bottom">
									<div className="like">
										<div className="asset">
											<img src="/assets/feed/like-dac.svg" alt="좋아요" />
										</div>
										<div className="count txt-bold">25k</div>
									</div>
									<div className="comment">
										<div className="asset">
											<img src="/assets/feed/comment.svg" alt="댓글" />
										</div>
										<div className="count txt-bold">2k</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className='profile-info-desc'>
						<div className='desc'>
							<div className='title txt-bold'>좋아요</div>
							<div className='count'>739,000</div>
						</div>
						<div className='desc'>
							<div className='title txt-bold'>팔로워</div>
							<div className='count'>2,539,000</div>
						</div>
						<div className='desc'>
							<div className='title txt-bold'>포스트</div>
							<div className='count'>320</div>
						</div>
						<div className='desc'>
							<div className='title txt-bold'>친구</div>
							<div className='count'>236,320</div>
						</div>
					</div>

				</div>
			</div>
		</div>

	)
}

export default Profile
