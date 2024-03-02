from service.core.session import TrainingResult
from service.core.session.training import TrainingResultCalculatorStrategy, Mark
from service.domain.session import Session


class DumbTrainingResultCalculatorStrategy(TrainingResultCalculatorStrategy):
    def calculate(self, session: Session) -> TrainingResult:
        attempt = len(session.attempts)
        return TrainingResult(session_uid=session.uid,
                              attempt=attempt,
                              mark=Mark.FIVE)
